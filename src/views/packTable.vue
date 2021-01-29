<!--
 * @Description: 
 * @Autor: xiukun@herry
 * @Date: 2021-01-28 17:11:13
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-01-29 11:40:27
-->
<template>
    <div class="app-container packTable">
        <page-table :tableColumns="tableColumns" :data="tableData">
        </page-table>
    </div>
</template>

<script>
import PageTable from '@/components/ele/PageTable';
export default {
    name: 'packTable',
    components: { PageTable },
    data() {
        return {
            tableColumns: [
                {
                    type: 'selection',
                    fixed: 'left',
                    selectable: (row) => {
                        return row.selectable;
                    },
                },
                {
                    prop: 'date',
                    label: '日期',
                    width: '140px',
                    sortable: true,
                },
                {
                    prop: 'name',
                    label: '姓名',
                    width: 120,
                    // sortable: true,
                },
                {
                    prop: 'address',
                    label: '地址',
                    minWidth: '120px',
                    // sortable: true,
                },
            ],
            tableData: [
                {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                },
                {
                    date: '2016-05-02',
                    name: '王小',
                    address: '上海市普陀区金沙江路 1517 弄',
                },
                {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                },
                {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                },
                {
                    date: '2016-05-08',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                },
                {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                },
                {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                },
                {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                },
                {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                },
                {
                    date: '2016-05-08',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                },
                {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                },
                {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                },
                {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                },
                {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                },
                {
                    date: '2016-05-08',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                },
            ],
        };
    },
};
</script>

<style>
</style>