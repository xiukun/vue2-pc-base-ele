<!--
 * @Description: 查询搜索组件
 * @Autor: xiukun@herry
 * @Date: 2021-01-26 10:25:45
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-01-27 15:06:15
-->
<template>
    <el-form ref="formRef" :model="form" :rules="rules" :status-icon="StatusIcon" :label-width="LabelWidth" :label-position="LabelPosition" :inline="inline" @submit.native.prevent>
        <slot name="header" />
        <template v-for="key in attrs">
            <el-form-item :key="key.prop" :label="key.label" :prop="key.prop" v-if="!key.hide">
                <!-- input组件 -->
                <el-input v-if="isShow(key,'input')" v-model="form[key.prop]" :type="key.type ? key.type : 'text'" autocomplete="off" :placeholder="key.placeholder?key.placeholder:'请输入'" :maxlength="key.maxLength" :minlength="key.minLength" :rows="key.rows" :step="key.step" :suffix-icon="key.suffixIcon" :prefix-icon="key.prefixIcon" :autofocus="key.autofocus?key.autofocus:false"
                    :class="{ 'show-word-limit-input': !!key.maxLength }" :disabled="key.disabled" show-word-limit clearable>
                    <span slot="append" v-if="key.unit">{{key.unit}}</span>
                </el-input>
                <!-- select组件 -->
                <el-select v-else-if="isShow(key, 'select')" v-model="form[key.prop]" @change="val => changeSelect(val, key, form)" :filterable="key.filterable" :remote="key.remoteMethod ? true:false" :remote-method="key.remoteMethod" :disabled="key.disabled" :default-first-option="typeof key.defaultFirstOption === 'boolean' ? key.clearable : true" :multiple="key.multiple"
                    :clearable="typeof key.clearable === 'boolean' ? key.clearable : true" :placeholder="key.placeholder?key.placeholder:'请选择'">
                    <el-option v-for="(option, i) in key.options" :key="i" :label="option[key.keyProp ? key.keyProp.label : 'label']" :value="option[key.keyProp ? key.keyProp.value : 'value']">
                        <template v-if="key.customOption">
                            <span style="float: left">{{ key.label }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{ key.value }}</span>
                        </template>
                    </el-option>
                </el-select>
                <!-- cascader 级联选择器 -->
                <el-cascader v-else-if="isShow(key, 'cascader')" v-model="form[key.prop]" :placeholder="key.placeholder ? key.placeholder : `请输入${key.label}`" :options="key.options" :props="key.optionProps" @change="val => changeCascader(val, key)" clearable></el-cascader>
                <!-- DatePicker 日期选择器 -->
                <el-date-picker v-else-if="isShow(key, 'datePicker')" :disabled="key.disabled" v-model="form[key.prop]" :type="key.type || 'datetimerange'" :picker-options="key.pickerOptions" range-separator="至" :value-format="key.valueFormat || 'yyyy-MM-dd HH:mm:ss'" :format="key.format || 'yyyy-MM-dd HH:mm:ss'" @change="val => changeTime(val, key)" :placeholder="key.placeholder || '请选择'"
                    :start-placeholder="key.startPlaceholder ? key.startPlaceholder : '开始时间'" :end-placeholder="key.endPlaceholder ? key.startPlaceholder : '结束时间'" :clearable="typeof key.clearable === 'boolean' ? key.clearable : true" :default-time="key.defaultTime ? key.defaultTime : ['00:00:00', '23:59:59']"></el-date-picker>
                <!-- checkbox -->
                <el-checkbox-group v-else-if="isShow(key, 'checkbox')" :disabled="key.disabled" v-model="form[key.prop]" :min="key.min ? key.min : 0" :max="key.max ? key.max : 1000">
                    <el-checkbox v-for="opt in key.options" :label="opt.value" :disabled="opt.disabled" :key="opt.value" :value="opt.value">{{ opt.label }}</el-checkbox>
                </el-checkbox-group>
                <!-- radio -->
                <el-radio-group v-else-if="isShow(key, 'radio')" v-model="form[key.prop]">
                    <el-radio :disabled="key.disabled" v-for="radio in key.options" :key="radio.label" :label="radio.value" :value="radio.value">{{ radio.label }}</el-radio>
                </el-radio-group>
                <el-radio-group v-else-if="isShow(key, 'radioButton')" v-model="form[key.prop]">
                    <el-radio-button :disabled="key.disabled" v-for="radio in key.options" :key="radio.label" :label="radio.value">{{ radio.label }}</el-radio-button>
                </el-radio-group>
                <!-- switch -->
                <el-switch :active-value="key.activeValue" :inactive-value="key.inactiveValue" v-else-if="isShow(key, 'switch')" v-model="form[key.prop]">
                </el-switch>
            </el-form-item>
        </template>
        <slot name="search"></slot>
    </el-form>
</template>

<script>
export default {
    name: 'form-search',
    props: {
        form: {
            type: Object,
            default: () => {},
        },
        rules: {
            type: Object,
            default: () => {},
        },
        //查询条件集合
        props: {
            type: Array,
            default: () => {},
        },
        //是否行内表单模式 默认true
        inline: {
            type: Boolean,
            default: true,
        },
        //表单域标签的宽度 支持auto
        LabelWidth: {
            type: String,
            default: '100px',
        },
        //表单域标签的位置 默认right对齐
        LabelPosition: {
            type: String,
            default: 'right',
        },
        StatusIcon: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            attrs: this.props,
        };
    },
    methods: {
        refresh: function (attrs) {
            this.attrs = attrs;
            console.log(this.attrs);
        },
        isShow(item, tag) {
            return item.tag === tag;
        },
        changeCascader(val, item) {
            console.log(val, item);
            if (item.change) {
                item.change(val, item);
            }
        },
        changeTime(val, item) {
            console.log(item);
            if (item && item.changeTime) {
                item.changeTime(val, item);
            }
        },
        changeSelect(val, item, form) {
            if (item.change) {
                item.change(val, item, form);
            }
        },
    },
};
</script>

<style>
</style>