<!--
 * @Description: 
 * @Autor: xiukun@herry
 * @Date: 2021-01-08 10:35:48
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-02-01 11:41:22
-->
<template>
    <div class="app-container home">
        <el-form :model="queryParams" ref="queryForm" label-width="100px" :inline="true" v-show="showSearch">
            <el-form-item label="部门名称" prop="deptName">
                <el-input step="5" type="number" v-model="queryParams.deptName" placeholder="请输入部门名称" clearable size="small" @keyup.enter.native="handleQuery">
                    <!-- <span slot="append">吨</span> -->
                </el-input>
            </el-form-item>
            <el-form-item label="状态" prop="status">
                <el-select v-model="queryParams.status" placeholder="部门状态" clearable size="small">
                    <el-option value="111">aaaaa</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="状态" prop="status">
                <el-select v-model="queryParams.status" placeholder="部门状态" clearable size="small">
                    <el-option value="111">aaaaa</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="状态" prop="status">
                <el-select v-model="queryParams.status" placeholder="部门状态" clearable size="small">
                    <el-option value="111">aaaaa</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="时间" prop="status">
                <el-date-picker v-model="value2" type="datetimerange" align="right" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['12:00:00', '08:00:00']">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="部门名称" prop="deptName">
                <el-input step="5" type="number" v-model="queryParams.deptName" placeholder="请输入部门名称" clearable size="small" @keyup.enter.native="handleQuery">
                    <span slot="append">吨</span>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini">重置</el-button>
            </el-form-item>
        </el-form>
        <form-search ref="formSearchRef" :rules="rules" :props="searchConfig.props" :form="filterForm" :label-width="searchConfig.labelWidth" :inline="true">
            <el-form-item slot="search" style="float:right;right:20px;">
                <el-button type="primary" icon="el-icon-search" @click.stop.prevent="searchBtn">查询</el-button>
                <el-button type="warning" icon="el-icon-refresh">重置</el-button>
                <el-button type="info" icon="el-icon-plus">添加</el-button>
                <el-button>文本说明</el-button>
                <el-button icon="el-icon-sort" @click="()=>{this.$refs.formSearchRef.toggleBtn()}" circle></el-button>
            </el-form-item>
        </form-search>
    </div>
</template>
<script>
import _ from 'lodash';
import FormSearch from '@com/ele/FormSearch';

export default {
    name: 'index',
    components: {
        FormSearch,
    },
    data() {
        return {
            showSearch: true, // 显示搜索条件
            // 查询参数
            queryParams: {
                deptName: null,
                status: null,
            },
            that: this,
            value2: '',
            searchConfig: {
                labelWidth: '120px',
                props: [
                    {
                        tag: 'input',
                        prop: 'p1',
                        type: 'number',
                        placeholder: '订单编号',
                        label: '订单编号:',
                    },
                    {
                        tag: 'input',
                        prop: 'p2',
                        placeholder: '下单人手机号',
                        label: '下单人手机号:',
                    },
                    {
                        tag: 'input',
                        prop: 'p3',
                        placeholder: '收货人姓名',
                        label: '收货人姓名:',
                    },
                    {
                        tag: 'input',
                        prop: 'p4',
                        placeholder: '收货人手机号',
                        label: '收货人手机号:',
                    },
                    {
                        tag: 'input',
                        prop: 'p5',
                        placeholder: '收货地址',
                        label: '收货地址:',
                    },
                    {
                        tag: 'select',
                        prop: 'p6',
                        placeholder: '订单状态',
                        options: [
                            { value: -1, label: '全部' },
                            { value: 0, label: '待支付' },
                            { value: 8, label: '待配送' },
                            { value: 1, label: '配送中' },
                            { value: 2, label: '已完成' },
                            { value: 3, label: '已取消' },
                            { value: 4, label: '已退款' },
                            { value: 5, label: '停订' },
                            { value: 6, label: '售后中' },
                            { value: 7, label: '作废' },
                        ],
                        label: '订单状态:',
                    },

                    {
                        tag: 'select',
                        prop: 'p7',
                        placeholder: '奶站',
                        options: [
                            { value: 0, label: '鲜活go' },
                            { value: 2, label: '电商' },
                            { value: 3, label: '征订' },
                        ],
                        label: '奶站:',
                        filterable: true,
                        change: (val, item, form) => {
                            console.log(val, item, form);
                        },
                    },
                    {
                        tag: 'select',
                        prop: 'p8',
                        placeholder: '选择订单来源',
                        options: undefined,
                        label: '订单来源:',
                    },
                    {
                        tag: 'datePicker',
                        prop: 'p9',
                        type: 'datetimerange',
                        placeholder: '下单日期',
                        label: '下单日期:',
                    },
                ],
                optBtns: [],
            },
            selectData: undefined,

            filterForm: {
                p1: '',
                p2: '',
                p3: '',
                p4: '',
                p5: '',
                p6: '',
                p7: '',
                p8: '',
                p9: [],
            },
            rules: {
                p1: [
                    {
                        required: true,
                        message: '请输入..',
                        trigger: 'blur',
                    },
                ],
            },
        };
    },
    mounted() {
        console.log(this.test2());
        this.selectData = [
            { value: 0, label: '鲜活go' },
            { value: 2, label: '电商' },
            { value: 3, label: '征订' },
            { value: 4, label: '奶站' },
            { value: 5, label: '牛奶钱包' },
            { value: 6, label: '送奶工App' },
            { value: 70, label: '电话' },
            { value: 80, label: '机构' },
            { value: 100, label: '鲜生活' },
            { value: 110, label: '鲜小厨' },
            { value: 120, label: '小程序' },
            { value: 130, label: '淘宝' },
            { value: 140, label: '拼多多' },
            { value: 150, label: '天猫' },
            { value: 160, label: '京东' },
            { value: 170, label: '总部店铺' },
            { value: 180, label: '牛奶钱包' },
            { value: 190, label: '千丁' },
            { value: 200, label: '鑫划算' },
            { value: 210, label: '琥珀亲子' },
            { value: 220, label: '星life' },
            { value: 230, label: '龙湖享家' },
            { value: 240, label: '业点点' },
            { value: 250, label: '苏宁易购' },
            { value: 260, label: '万科' },
            { value: 270, label: '生活记' },
        ];
        //p8  select延迟赋值
        setTimeout(() => {
            for (let i = this.searchConfig.props.length - 1; i >= 0; i--) {
                if (this.searchConfig.props[i].prop === 'p8') {
                    this.searchConfig.props[i].options = this.selectData;
                    console.log(this.searchConfig.props);
                    return;
                }
                console.log(this.searchConfig.props[i].prop);
            }
        }, 2000);
        // let newProps = _.cloneDeep(this.searchConfig.props);
        // this.$refs.formSearchRef.refresh(newProps);
    },
    methods: {
        searchBtn() {
            console.log(this.filterForm);
        },
        goTarget(href) {
            window.open(href, '_blank');
        },
        test2: function () {
            let users = [
                { user: 'barney', age: 36, active: true },
                { user: 'fred', age: 40, active: false },
                { user: 'pebbles', age: 1, active: true },
            ];
            let obj = _.find(users, function (o) {
                return o.age < 40;
            });
            console.log(this, obj);
        },
    },
};
</script>

<style scoped lang="scss">
.home {
    blockquote {
        padding: 10px 20px;
        margin: 0 0 20px;
        font-size: 17.5px;
        border-left: 5px solid #eee;
    }
}
</style>


