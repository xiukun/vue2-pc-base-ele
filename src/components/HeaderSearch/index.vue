<!--
 * @Description: 头部右上角搜索菜单
 * @Autor: xiukun@herry
 * @Date: 2021-01-08 17:09:56
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-01-25 10:15:00
-->

<template>
    <div :class="{'show':show}" class="header-search">
        <i class="el-icon-search search-icon" @click.stop="click"></i>
        <el-select ref="headerSearchSelect" v-model="search" :remote-method="querySearch" filterable default-first-option remote placeholder="搜索菜单" class="header-search-select" @change="change">
            <el-option v-for="option in options" :key="option.path" :value="option" :label="option.title.join(' > ')" />
        </el-select>
    </div>
</template>

<script>
// fuse.js是轻量级的模糊搜索插件
import Fuse from 'fuse.js';
import path from 'path';

export default {
    name: 'HeaderSearch',
    data() {
        return {
            search: '',
            options: [],
            searchPool: [],
            show: false,
            fuse: undefined,
        };
    },
    computed: {
        routes() {
            return this.$store.getters.permission_routes;
        },
    },
    watch: {
        routes() {
            this.searchPool = this.generateRoutes(this.routes);
        },
        searchPool(list) {
            this.initFuse(list);
        },
        show(value) {
            if (value) {
                document.body.addEventListener('click', this.close);
            } else {
                document.body.removeEventListener('click', this.close);
            }
        },
    },
    mounted() {
        this.searchPool = this.generateRoutes(this.routes);
    },
    methods: {
        click() {
            this.show = !this.show;
            if (this.show) {
                this.$refs.headerSearchSelect &&
                    this.$refs.headerSearchSelect.focus();
            }
        },
        close() {
            this.$refs.headerSearchSelect &&
                this.$refs.headerSearchSelect.blur();
            this.options = [];
            this.show = false;
        },
        change(val) {
            if (this.ishttp(val.path)) {
                // http(s):// 路径新窗口打开
                window.open(val.path, '_blank');
            } else {
                this.$router.push(val.path);
            }
            this.search = '';
            this.options = [];
            this.$nextTick(() => {
                this.show = false;
            });
        },
        initFuse(list) {
            this.fuse = new Fuse(list, {
                shouldSort: true,
                threshold: 0.4,
                location: 0,
                distance: 100,
                maxPatternLength: 32,
                minMatchCharLength: 1,
                keys: [
                    {
                        name: 'title',
                        weight: 0.7,
                    },
                    {
                        name: 'path',
                        weight: 0.3,
                    },
                ],
            });
        },
        // 生成一维扁平化路由数组，方便使用fuse进行筛选
        generateRoutes(routes, basePath = '/', prefixTitle = []) {
            let res = [];
            /**
             * 遍历所有路由，并进行扁平化处理
             */
            for (const router of routes) {
                // 如果为隐藏的菜单项，跳过循环
                if (router.hidden) {
                    continue;
                }
                // 为每个路由创建一个简单的对象
                const data = {
                    path: !this.ishttp(router.path)
                        ? path.resolve(basePath, router.path)
                        : router.path,
                    title: [...prefixTitle],
                };

                if (router.meta && router.meta.title) {
                    // 如果存在菜单标题，则添加菜单标题
                    data.title = [...data.title, router.meta.title];

                    if (router.redirect !== 'noRedirect') {
                        // 如果不为父级菜单（重定向菜单），则添加菜单项
                        res.push(data);
                    }
                }

                // 如果含有子菜单，则继续递归遍历
                if (router.children) {
                    const tempRoutes = this.generateRoutes(
                        router.children,
                        data.path,
                        data.title
                    );
                    if (tempRoutes.length >= 1) {
                        // 如果子菜单数量不为0，则添加所有子菜单项
                        // res = [...res, ...tempRoutes];
                        res.push(...tempRoutes);
                    }
                }
            }
            return res;
        },
        querySearch(query) {
            if (query !== '') {
                this.options = this.fuse.search(query);
                console.log(this.options);
            } else {
                this.options = [];
            }
        },
        ishttp(url) {
            return (
                url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1
            );
        },
    },
};
</script>

<style lang="scss" scoped>
.header-search {
    font-size: 0 !important;

    .search-icon {
        cursor: pointer;
        font-size: 18px;
        font-weight: bold;
        vertical-align: middle;
    }

    .header-search-select {
        font-size: 18px;
        transition: width 0.2s;
        width: 0;
        overflow: hidden;
        background: transparent;
        border-radius: 0;
        display: inline-block;
        vertical-align: middle;

        ::v-deep .el-input__inner {
            border-radius: 0;
            border: 0;
            padding-left: 0;
            padding-right: 0;
            box-shadow: none !important;
            border-bottom: 1px solid #d9d9d9;
            vertical-align: middle;
        }
    }

    &.show {
        .header-search-select {
            width: 210px;
            margin-left: 10px;
        }
    }
}
</style>
