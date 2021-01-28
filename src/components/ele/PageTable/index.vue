<!--
 * @Description: 
 * @Autor: xiukun@herry
 * @Date: 2021-01-27 16:08:22
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-01-27 18:29:43
-->
<template>
    <div style="margin: 0;padding: 0" :class="tableClass">
        <el-table ref="tableRef" :data="data" v-loading="loading" tooltip-effect="light" :size="size" :height="height" :max-height="maxHeight" :fit="fit" :stripe="stripe" :border="border" :show-header="showHeader" @selection-change="handleSelectionChange" style="width: 100%" :cell-style="cellStyleMothod" :span-method="spanMethod" :highlight-current-row="false" :show-summary="showSummary"
            :summary-method="getSummaries" :default-expand-all="defaultExpandAll" @current-change="singleSelectChange" @sort-change="handleSortChange">
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
                    type
                },index) of tColumns">
                <!-- 第一列是否复选框 -->
                <el-table-column :key="`selection${index}`" :selectable="tColumns[0].selectable" type="selection" width="55" :fixed="tColumns[0].fixed" v-if="tColumns[0].type === 'selection'">
                </el-table-column>
                <!-- hide为false type为false 显示正常的列 -->
                <el-table-column :key="index" v-if="!hide && !type" :prop="prop" :label="label" :align="align" :width="width" :min-width="minWidth" :sortable="sortable" :formatter="formatter" :fixed="fixed">
                </el-table-column>
                <!-- hide为false type为outlink 点击列值跳转新页面，显示外链 -->
                <el-table-column :key="index" v-else-if="!hide && type == 'outlink'" :prop="prop" :label="label" :align="align" :width="width" :min-width="minWidth" :sortable="sortable" :formatter="formatter" :fixed="fixed">
                    <template slot-scope="scope">
                        <el-button @click="openTab(scope.row.rybh)" type="text">
                            {{ scope.row.xm }}</el-button>
                    </template>
                </el-table-column>
                <!-- hide为false type为html 列值为html元素内容显示 -->
                <el-table-column :key="index" v-else-if="!hide && type == 'html'" :prop="prop" :label="label" :align="align" :width="width" :min-width="minWidth" :sortable="sortable" :formatter="formatter" :fixed="fixed">
                    <template slot-scope="scope">
                        <div v-html="dateHtml(scope.row[prop])"></div>
                    </template>
                </el-table-column>
            </template>

        </el-table>
    </div>
</template>

<script>
export default {
    name: 'page-table',
    props: {
        tableClass: {
            // 表格父div默认的class
            type: String,
            default: () => 'app-table',
        },
        tableColumns: {
            type: Array,
            default: () => {},
        },
        dynamicColumn: {
            // 是否开启动态列功能
            type: Boolean,
            default: true,
        },
        // 以下为 el-table 默认
        loading: {
            type: Boolean,
            default: false,
        },
        size: String,
        height: [String, Number],
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
    },
    computed: {
        tColumns: function () {
            if (this.dynamicColumn && this.tableColumns) {
                return this.tableColumns;
            }
            return [];
        },
    },
    methods: {
        toggleRowExpansion(row, e) {
            this.$refs.tableRef.toggleRowExpansion(row, e);
        },
        handleSortChange(val) {
            this.$emit('handleSortChange', val);
        },
        singleSelectChange(val) {
            this.$emit('singleSelectChange', val);
        },
        currentChange(val) {
            this.$emit('currentChange', val);
        },
        sizeChange(val) {
            this.$emit('sizeChange', val);
        },
        handleSelectionChange(val) {
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
    },
};
</script>

<style>
</style>