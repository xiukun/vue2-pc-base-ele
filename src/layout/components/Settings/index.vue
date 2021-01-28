<template>
    <div class="drawer-container">
        <div>
            <div class="setting-drawer-content">
                <div class="setting-drawer-title">
                    <h3 class="drawer-title">主题风格设置</h3>
                </div>
                <div class="setting-drawer-block-checbox">
                    <div class="setting-drawer-block-checbox-item" @click="handleTheme('theme-dark')">
                        <svg-icon icon-class="dark" class-name="side-img"></svg-icon>
                        <div v-if="sideTheme === 'theme-dark'" class="setting-drawer-block-checbox-selectIcon" style="display: block;">
                            <i class="el-icon-check" style="font-weight:bold" />
                        </div>
                    </div>
                    <div class="setting-drawer-block-checbox-item" @click="handleTheme('theme-light')">
                        <svg-icon icon-class="light" class-name="side-img"></svg-icon>
                        <div v-if="sideTheme === 'theme-light'" class="setting-drawer-block-checbox-selectIcon" style="display: block;">
                            <i class="el-icon-check" style="font-weight:bold" />
                        </div>
                    </div>
                </div>
            </div>

            <el-divider />

            <h3 class="drawer-title">系统布局配置</h3>

            <div class="drawer-item">
                <span>开启 Tags-Views</span>
                <el-switch v-model="tagsView" class="drawer-switch" />
            </div>

            <div class="drawer-item">
                <span>显示 Logo</span>
                <el-switch v-model="sidebarLogo" class="drawer-switch" />
            </div>

        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    computed: {
        theme() {
            return this.$store.state.settings.theme;
        },
        sideTheme() {
            return this.$store.state.settings.sideTheme;
        },
        tagsView: {
            get() {
                return this.$store.state.settings.tagsView;
            },
            set(val) {
                this.$store.dispatch('settings/changeSetting', {
                    key: 'tagsView',
                    value: val,
                });
            },
        },
        sidebarLogo: {
            get() {
                return this.$store.state.settings.sidebarLogo;
            },
            set(val) {
                this.$store.dispatch('settings/changeSetting', {
                    key: 'sidebarLogo',
                    value: val,
                });
            },
        },
    },
    methods: {
        handleTheme(val) {
            this.$store.dispatch('settings/changeSetting', {
                key: 'sideTheme',
                value: val,
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.setting-drawer-content {
    .setting-drawer-title {
        margin-bottom: 12px;
        color: rgba(0, 0, 0, 0.85);
        font-size: 14px;
        line-height: 22px;
        font-weight: bold;
    }

    .setting-drawer-block-checbox {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-top: 10px;
        margin-bottom: 20px;

        .setting-drawer-block-checbox-item {
            position: relative;
            margin-right: 16px;
            border-radius: 2px;
            cursor: pointer;

            .side-img {
                width: 48px;
                height: 48px;
            }

            .setting-drawer-block-checbox-selectIcon {
                position: absolute;
                top: 0;
                right: 0;
                width: 100%;
                height: 100%;
                padding-top: 15px;
                padding-left: 24px;
                color: #00caab;
                font-weight: 700;
                font-size: 14px;
            }
        }
    }
}

.drawer-container {
    padding: 24px;
    font-size: 14px;
    line-height: 1.5;
    word-wrap: break-word;

    .drawer-title {
        margin-bottom: 12px;
        color: rgba(0, 0, 0, 0.85);
        font-size: 14px;
        line-height: 22px;
    }

    .drawer-item {
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
        padding: 12px 0;
    }

    .drawer-switch {
        float: right;
    }
}
</style>
