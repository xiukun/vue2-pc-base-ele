搜索条件组件
===

使用说明
----

```html 
<form-search ref="formSearchRef" :rules="rules" :props="searchConfig.props" :form="filterForm" :label-width="searchConfig.labelWidth" :inline="true">
    <el-form-item slot="search" style="float:right;right:20px;">
        <el-button type="primary" icon="el-icon-search" @click.stop.prevent="searchBtn">查询</el-button>
        <el-button type="warning" icon="el-icon-refresh">重置</el-button>
        <el-button type="info" icon="el-icon-plus">添加</el-button>
        <el-button>文本说明</el-button>
    </el-form-item>
</form-search>
```

```ecmascript 6
import FormSearch from '@com/ele/FormSearch';
export default {
    name: 'index',
    components: {
        FormSearch,
    },
    data() {
        return {
            showSearch: true, // 显示搜索条件
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
                        ],
                        label: '订单状态:',
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
                p5: '',
                p6: '',
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
        this.selectData = [
            { value: 0, label: '淘宝' },
            { value: 2, label: '电商' },
            { value: 3, label: '征订' },
            { value: 4, label: '奶站' },
            { value: 5, label: '奶农' },
            { value: 6, label: 'App' },
            { value: 70, label: '电话' },
            { value: 80, label: '机构' },
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
}
```


`{ form }` 对象
| 参数     | 说明                                      | 类型    | 默认值 |
| -------- | ----------------------------------------- | ------- | ------ |
| props    | 表单组件集合                               | array | — |
| form     | 表单数据对象                               | object | — |
| rules    | 表单验证规则                               | object | — |
| inline   | 是否行内表单模式                            | boolean | true |
| label-width | 表单域标签的宽度                         | string | 100px |
| label-position | 表单域标签的位置 right/left/top       | string | right |
| status-icon    | 是否在输入框中显示校验结果反馈图标      | object | true |

`{ form slot }` 插槽
| 参数     | 说明 |
| ------- | ---  |
| header | form头部插槽  |

`{ props }` 数组集合
| input参数 | 说明                              | 类型    | 默认值 |
| ------- | --------------------------------- | ------- | ------ |
| tag |  元素标签名input                      | string | — |
| prop |  绑定值 对应form对象的值              | string / number | — |
| 其他 |  小驼峰命名xxYyyy,对应el-input属性及方法，只是常用的属性封装 | — | — |

| select参数 | 说明                              | 类型    | 默认值 |
| ------- | --------------------------------- | ------- | ------ |
| tag |  元素标签名select                     | string | — |
| prop |  绑定值 对应form对象的值              | string / number | — |
| 其他 |  小驼峰命名xxYyyy,对应el-input属性及方法，只是常用的属性封装 | — | — |

| cascader参数 | 说明                              | 类型    | 默认值 |
| ------- | --------------------------------- | ------- | ------ |
| tag |  元素标签名cascader                   | string | — |
| prop |  绑定值 对应form对象的值              | string / number | — |
| 其他 |  小驼峰命名xxYyyy,对应el-input属性及方法，只是常用的属性封装 | — | — |

| checkbox参数 | 说明                              | 类型    | 默认值 |
| ------- | --------------------------------- | ------- | ------ |
| tag |  元素标签名checkbox                   | string | — |
| prop |  绑定值 对应form对象的值              | string / number | — |
| 其他 |  小驼峰命名xxYyyy,对应el-input属性及方法，只是常用的属性封装 | — | — |

| radio参数 | 说明                              | 类型    | 默认值 |
| ------- | --------------------------------- | ------- | ------ |
| tag |  元素标签名radio                   | string | — |
| prop |  绑定值 对应form对象的值              | string / number | — |
| 其他 |  小驼峰命名xxYyyy,对应el-input属性及方法，只是常用的属性封装 | — | — |

| switch参数 | 说明                              | 类型    | 默认值 |
| ------- | --------------------------------- | ------- | ------ |
| tag |  元素标签名switch                   | string | — |
| prop |  绑定值 对应form对象的值              | string / number | — |
| 其他 |  小驼峰命名xxYyyy,对应el-input属性及方法，只是常用的属性封装 | — | — |
