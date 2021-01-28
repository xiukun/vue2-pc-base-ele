<!--
 * @Description: 
 * @Autor: xiukun@herry
 * @Date: 2021-01-13 13:37:18
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-01-15 18:37:10
-->
<template>
    <div class="link-home" ref="iframeContainer">
        <iframe ref="iframe" :src="iframeSrc" width="100%" scrolling="auto" frameborder="0"></iframe>
    </div>
</template>

<script>
export default {
    data() {
        return {
            iframeSrc: '',
        };
    },
    created() {
        let outlink = this.$route.meta.link || '';
        let isTrue = this.isHttp(this.$route.meta.link);
        if (isTrue) {
            this.iframeSrc = outlink;
        }
    },
    mounted() {
        this.$refs.iframe.height = this.$refs.iframeContainer.offsetHeight - 5;
    },
    methods: {
        isHttp(path) {
            return /^(https?:|http?:)/.test(path);
        },
    },
};
</script>

<style lang="scss" scoped>
.link-home {
    /* 50= navbar  50  */
    min-height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    // -webkit-overflow-scrolling:touch;overflow:auto;
    ::-webkit-scrollbar {
        // display: none;
        box-sizing: border-box;
        width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
    }
    ::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 10px;
        background: rgba(156, 156, 156, 0.5);
    }
    ::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        border-radius: 10px;
        background: #fff;
        margin: 5px 0;
    }
}

.fixed-header + .link-home {
    padding-top: 50px;
}

.hasTagsView {
    .link-home {
        /* 84 = navbar + tags-view = 50 + 34 */
        min-height: calc(100vh - 84px);
    }

    .fixed-header + .link-home {
        padding-top: 84px;
    }
}
</style>