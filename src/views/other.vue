<!--
 * @Description: 
 * @Autor: xiukun@herry
 * @Date: 2021-01-08 10:35:48
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-01-28 14:03:49
-->
<template>
    <div class="app-container home">
        <p>abcdefg</p>
        <p>abcdefg</p>
        <div class="app-table" :style="{'height': bgHeight}">
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
                <el-table border stripe :data="tableData" tooltip-effect="dark" style="width: 100%;" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" :selectable="(row, index)=>{return !row.selectable}" width="55">
                    </el-table-column>
                    <el-table-column label="日期" width="120">
                        <template slot-scope="scope">{{ scope.row.date }}</template>
                    </el-table-column>
                    <el-table-column prop="name" label="姓名" width="120">
                    </el-table-column>
                    <el-table-column prop="address" label="地址" show-overflow-tooltip>
                    </el-table-column>
                </el-table>

            </div>

        </div>

        <section>
            <p>abcdefg</p>
            <p>abcdefg</p>
            <p>abcdefg</p>
            <p>abcdefg</p>
            <p>abcdefg</p>
            <p>abcdefg</p>
            <p>abcdefg</p>
            <p>abcdefg</p>
            <p>abcdefg</p>
            <p>abcdefg</p>
            <p>abcdefg</p>
        </section>
    </div>
</template>
<script>
export default {
    name: 'ohert',
    data() {
        return {
            bgHeight: null,
            bgNumber: 0,
            tableData: [
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
            multipleSelection: [],
        };
    },

    methods: {
        handleSelectionChange(val) {
            this.multipleSelection = val;
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
.app-table {
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


