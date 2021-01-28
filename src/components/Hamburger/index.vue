<!--
 * @Description: 头部 左侧的折叠 展开按钮
 * @Autor: xiukun@herry
 * @Date: 2021-01-07 17:10:37
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-01-08 17:08:26
-->
<template>
    <div style="padding: 0 15px;" @click="toggleClick">
        <i class="el-icon-s-fold hamburger" :class="{'is-active':isActive}"></i>
    </div>
</template>

<script>
export default {
    name: 'Hamburger',
    props: {
        isActive: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        toggleClick() {
            this.$emit('toggleClick');
        },
    },
};
</script>

<style scoped>
.hamburger {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
}

.hamburger.is-active {
    transform: rotate(180deg);
}
</style>
