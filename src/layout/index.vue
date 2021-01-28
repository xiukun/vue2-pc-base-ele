<template>
    <div v-if="dynamicValue" :class="classObj" class="app-wrapper" :style="{'--current-color': theme}">
        <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
        <sidebar class="sidebar-container" :style="{ backgroundColor: sideTheme === 'theme-dark' ? variables.menuBg : variables.menuLightBg }" />
        <div :class="{hasTagsView:needTagsView}" class="main-container">
            <div class="fixed-header">
                <navbar />
                <tags-view v-if="needTagsView" />
            </div>
            <app-main class="main-wrapper" :style="{'overflow':dynamicValue}" />
            <right-panel v-if="showSettings">
                <settings />
            </right-panel>
        </div>
    </div>
</template>

<script>
import RightPanel from '@/components/RightPanel';
import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components';
import ResizeMixin from './mixin/ResizeHandler';
import { mapState } from 'vuex';
import variables from '@/assets/styles/variables.scss';

export default {
    name: 'Layout',
    components: {
        AppMain,
        Navbar,
        RightPanel,
        Settings,
        Sidebar,
        TagsView,
    },
    mixins: [ResizeMixin],
    data() {
        return {
            dynamicValue: null,
        };
    },
    computed: {
        ...mapState({
            theme: (state) => state.settings.theme,
            sideTheme: (state) => state.settings.sideTheme,
            sidebar: (state) => state.app.sidebar,
            device: (state) => state.app.device,
            showSettings: (state) => state.settings.showSettings,
            needTagsView: (state) => state.settings.tagsView,
        }),
        classObj() {
            return {
                hideSidebar: !this.sidebar.opened,
                openSidebar: this.sidebar.opened,
                withoutAnimation: this.sidebar.withoutAnimation,
                mobile: this.device === 'mobile',
            };
        },
        variables() {
            return variables;
        },
        outLink() {
            this.isOutLine();
            return this.dynamicValue;
        },
    },

    watch: {
        $route() {
            this.isOutLine();
        },
    },
    created() {
        this.isOutLine();
    },
    methods: {
        isOutLine() {
            let outlink = this.$route.meta.link || '';
            let isTrue = this.isHttp(outlink);
            if (isTrue) {
                this.dynamicValue = 'hidden';
            } else {
                this.dynamicValue = 'scroll';
            }
        },
        handleClickOutside() {
            this.$store.dispatch('app/closeSideBar', {
                withoutAnimation: false,
            });
        },
        isHttp(path) {
            return /^(https?:|http?:)/.test(path);
        },
    },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/mixin.scss';
@import '~@/assets/styles/variables.scss';

.app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
        position: fixed;
        top: 0;
    }
}
// .app-wrapper {
//     overflow: scroll;
// }

.main-wrapper::-webkit-scrollbar {
    // display: none;
    box-sizing: border-box;
    width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
}

.main-wrapper::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    background: rgba(156, 156, 156, 0.5);
}

.main-wrapper::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    border-radius: 10px;
    background: #fff;
    margin: 5px 0;
}

.drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
}

.fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
}

.hideSidebar .fixed-header {
    width: calc(100% - 54px);
}

.mobile .fixed-header {
    width: 100%;
}
</style>
