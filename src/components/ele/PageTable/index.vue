<!--
 * @Description: 
 * @Autor: xiukun@herry
 * @Date: 2021-01-27 16:08:22
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-01-29 11:36:37
-->
<template>
    <div class="com-table" :style="{'height': bgHeight}">
        <div ref="tbBackground" class="tb-bg" :style="{'height': bgHeight}">
            <template v-for="index of bgNumber">
                <div :key="index" class="bg-watermark">
                    <p>{{index+10000}}</p>
                    <p>我是防伪水印~~</p>
                    <p>国电商户系统，本系统，外链系统</p>
                </div>
            </template>

        </div>
        <div ref="tbLayout" style="width: 100%;position:absolute; top:0;opacity:0.91; ">
            <div style="margin: 0;padding: 0" :class="tableClass">
                <el-table ref="tableRef" :data="data" v-loading="loading" tooltip-effect="light" :size="size" :height="height" :max-height="maxHeight" :fit="fit" :stripe="stripe" :border="border" :show-header="showHeader" @selection-change="selectionChange" style="width: 100%" :cell-style="cellStyleMothod" :span-method="spanMethod" :highlight-current-row="false" :show-summary="showSummary"
                    :summary-method="getSummaries" :default-expand-all="defaultExpandAll" @current-change="currentChange" @sort-change="sortChange">
                    <slot></slot>
                    <!-- eslint-disable vue/no-use-v-if-with-v-for -->
                    <template v-for="({
                    prop,
                    label,
                    align = 'center',
                    width,
                    minWidth,
                    fixed,
                    sortable = false,
                    formatter,
                    hide = false,
                    selectable,
                    type
                },index) of tColumns">
                        <!-- 第一列是否复选框 -->
                        <el-table-column :key="`selection${index}`" :selectable="selectable" type="selection" width="55" :fixed="fixed" v-if="type === 'selection' && index === 0">
                        </el-table-column>
                        <!-- hide为false type为false 显示正常的列 -->
                        <el-table-column :key="index" v-if="!hide && !type" :prop="prop" :label="label" :align="align" :width="width" :min-width="minWidth" :sortable="sortable" :formatter="formatter" :fixed="fixed">
                        </el-table-column>
                        <!-- hide为false type为outlink 点击列值跳转新页面，显示外链 -->
                        <el-table-column :key="index" v-else-if="!hide && type == 'outlink'" :prop="prop" :label="label" :align="align" :width="width" :min-width="minWidth" :sortable="sortable" :formatter="formatter" :fixed="fixed">
                            <template slot-scope="scope">
                                <el-button @click="openTab(scope.row)" type="text">
                                    {{ scope.row[prop] }}</el-button>
                            </template>
                        </el-table-column>
                        <!-- hide为false type为html 列值为html元素内容显示 -->
                        <el-table-column :key="index" v-else-if="!hide && type == 'html'" :prop="prop" :label="label" :align="align" :width="width" :min-width="minWidth" :sortable="sortable" :formatter="formatter" :fixed="fixed">
                            <template slot-scope="scope">
                                <div v-html="dateHtml(scope.row[prop])"></div>
                            </template>
                        </el-table-column>
                    </template>
                    <div class="paging" v-if="page">
                        <el-pagination :page-size="search.pageSize" :current-page="search.currentPage" :total="total" :layout="layout" @size-change="sizeChange" @current-change="handleCurrentChange" :pager-count="pagerCount" :page-sizes="pageSizes" :popper-class="popperClass" :prev-text="prevText" :next-text="nextText" :background="background" hide-on-single-page @prev-click="prevClick"
                            @next-click="nextClick">
                            <slot name="pagination"></slot>
                        </el-pagination>
                    </div>
                </el-table>

            </div>
        </div>

    </div>

</template>

<script>
export default {
    name: 'page-table',
    props: {
        logData: {
            // 用于调试显示数据
            type: Boolean,
            default: false,
        },
        tableClass: {
            // 表格父div默认的class
            type: String,
            default: () => 'app-table',
        },
        data: {
            //数据集合
            type: Array,
            required: true,
        },
        page: {
            // 是否显示分页
            type: Boolean,
            default: false,
        },
        tableColumns: {
            //列对象
            type: Array,
            default: () => {},
        },
        dynamicColumn: {
            // 是否开启动态列功能
            type: Boolean,
            default: true,
        },
        // 列表数据的具体对应字段
        subModel: {
            type: String,
            default: 'list',
        },
        loadMethod: {
            // 加载数据的方法 必填
            type: Function,
            // required: true,
        },

        dataHandleMethod: {
            // 加载数据完成后 对数据进行处理的方法
            type: Function,
            required: false,
        },

        params: Object, // 调用 loadMethod 时传递的参数

        autoRefresh: {
            // 当 params 发生变化时自动刷新数据
            type: Boolean,
            default: true,
        },
        // 以下为 el-table 默认
        loading: {
            type: Boolean,
            default: false,
        },
        size: {
            type: String,
            default: 'small',
        },
        width: [String, Number],
        height: [String, Number],
        minWidth: [String],
        maxHeight: [String, Number],
        fit: {
            type: Boolean,
            default: true,
        },
        stripe: {
            type: Boolean,
            default: true, // 增加默认隔行换色
        },
        border: {
            type: Boolean,
            default: true, // 增加默认边框
        },
        showHeader: {
            type: Boolean,
            default: true,
        },
        cellStyleMothod: {
            type: Function,
        },
        spanMethod: {
            type: Function,
        },
        showSummary: {
            type: Boolean,
            default: false,
        },
        summaryMethod: {
            type: Function,
        },
        defaultExpandAll: {
            type: Boolean,
            default: false,
        },
        //el-pagination 属性默认
        pageSize: {
            type: Number,
            default: 20,
        },

        small: Boolean,
        pagerCount: {
            type: Number,
            validator(value) {
                return (
                    (value | 0) === value &&
                    value > 4 &&
                    value < 22 &&
                    value % 2 === 1
                );
            },
            default: 7,
        },

        currentPage: {
            type: Number,
            default: 1,
        },

        layout: {
            // default: 'prev, pager, next, jumper, ->, total'
            default: 'total, sizes, prev, pager, next, jumper', // 更改默认
        },

        pageSizes: {
            type: Array,
            default() {
                return [10, 20, 30, 40, 50, 100, 500];
            },
        },

        popperClass: String,

        prevText: String,

        nextText: String,

        background: Boolean,
    },
    data() {
        return {
            bgHeight: null,
            bgNumber: 0,
            list: [],
            dataColumns: [],
            total: 0,
            search: {
                ...this.params,
                pageNum: this.currentPage,
                pageSize: this.pageSize,
                orderProp: '',
                orderType: '',
            },
        };
    },
    computed: {
        tColumns: function () {
            if (this.dynamicColumn && this.tableColumns) {
                return this.tableColumns;
            }
            return [];
        },
    },
    mounted() {
        //计算背景防伪水印的宽高，以及循环防伪水印次数
        this.$nextTick(() => {
            let bgH =
                this.$refs.tbLayout.clientHeight ||
                this.$refs.tbLayout.offsetHeight;
            let bgW =
                this.$refs.tbLayout.clientWidth ||
                this.$refs.tbLayout.offsetWidth;
            this.bgHeight = bgH + 'px';
            this.bgNumber = Math.floor(bgW / 250) * Math.ceil(bgH / 250);
        });
    },
    methods: {
        //数据加载
        loadData() {
            // this.loadMethod(this.search).then((data) => {
            //     let resData = this.subModel === '' ? data : data[this.subModel];
            //     if (data && resData) {
            //         if (this.logData) {
            //             console.log(JSON.stringify(data, null, 4));
            //         }
            //         if (this.dataHandleMethod) {
            //             this.dataHandleMethod(resData);
            //             if (this.logData) {
            //                 console.log(
            //                     JSON.stringify(
            //                         { afterHandleDataList: resData },
            //                         null,
            //                         4
            //                     )
            //                 );
            //             }
            //         }
            //         this.list = resData;
            //         this.total = data.totalCount || 0;
            //         if (data.columns) {
            //             this.dataColumns = data.columns.filter(
            //                 (item) => item.status != false
            //             );
            //             this.columns = [
            //                 ...this.customColumns,
            //                 ...this.dataColumns,
            //             ];
            //         }
            //     } else {
            //         this.list = [];
            //     }
            //     this.$emit('update:data', this.list);
            // });
        },
        getData() {
            return this.list;
        },
        openTab(key) {
            // 点击跳转到相关页面
            console.log(key);
            if (this.ishttp(key.path)) {
                // http(s):// 路径新窗口打开
                window.open(key.path, '_blank');
            } else {
                this.$router.push(key.path);
            }
        },
        ishttp(url) {
            return (
                url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1
            );
        },
        //table
        toggleRowExpansion(row, e) {
            this.$refs.tableRef.toggleRowExpansion(row, e);
        },
        sortChange(val) {
            this.$emit('sortChange', val);
        },
        currentChange(val) {
            this.$emit('currentChange', val);
        },
        selectionChange(val) {
            this.$emit('selectionChange', val);
        },
        getSummaries(params) {
            let _arr = this.summaryMethod ? this.summaryMethod(params) : [];
            return _arr;
        },
        clearSelection() {
            this.$refs.tableRef.clearSelection();
        },
        toggleRowSelection(row, selected = true) {
            this.$nextTick(() => {
                this.$refs.tableRef.toggleRowSelection(row, selected);
            });
        },
        toggleAllSelection() {
            this.$nextTick(() => {
                this.$refs.tableRef.toggleAllSelection();
            });
        },
        //pagination 方法
        sizeChange(val) {
            this.$emit('sizeChange', val);
        },
        handleCurrentChange(index) {
            this.search.pageNum = index;
            this.loadData();
            this.$emit('current-change', index);
        },
        prevClick(index) {
            this.$emit('prev-click', index);
        },
        nextClick(index) {
            this.$emit('next-click', index);
        },
    },
};
</script>

<style lang="scss">
.el-table {
    color: #101010;
}
.el-table .el-table__header-wrapper th {
    color: #101010;
}
.el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: #a5e3f5;
}
</style>

<style lang="scss" scoped>
.com-table {
    position: relative;
    .tb-bg {
        width: 100%;
        position: absolute;
        overflow: hidden;
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        align-items: center;
        .bg-watermark {
            font-size: 20px;
            width: 250px;
            height: 250px;
            margin: 0 auto;
            transform: rotate(-45deg);
            p {
                text-align: center;
            }
        }
    }
}
</style>


