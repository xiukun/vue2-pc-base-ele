<!--
 * @Description: 右侧面板封装组件
 * @Autor: xiukun@herry
 * @Date: 2021-01-08 17:00:09
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-01-15 18:12:12
-->

<template>
    <el-drawer :visible.sync="show" :with-header="false">
        <slot />
    </el-drawer>
</template>

<script>
export default {
    name: 'RightPanel',
    props: {
        clickNotClose: {
            default: false,
            type: Boolean,
        },
    },
    computed: {
        show: {
            get() {
                return this.$store.state.settings.showSettings;
            },
            set(val) {
                this.$store.dispatch('settings/changeSetting', {
                    key: 'showSettings',
                    value: val,
                });
            },
        },
        // theme() {
        //     return this.$store.state.settings.theme;
        // },
    },
};
</script>

