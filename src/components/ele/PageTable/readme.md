
PageTable使用说明
----

```
常用方式为传一个名为load-method的prop，类型是function, 一般为src/data下的数据接口，以及绑定一个params的参数，参数变化的时候会自动刷新数据，也可以设置log-data用于调试
主要prop说明：
loadMethod: 加载数据的方法 必填
params： 调用 loadMethod 时传递的参数，不用传分页相关的
autoRefresh：当 params 发生变化时自动刷新数据 
logData： 用于调试显示数据
其他请查看源代码 
```

```html 
//分页暂时设置为false，loadMethod注释，暂时没有测试，测试后开放
<page-table :tableColumns="tableColumns" :data="tableData">
</page-table>
```
```ecmascript 6
import PageTable from '@/components/ele/PageTable';
export default {
    name: '',
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
            tableData: []
    },
}
```