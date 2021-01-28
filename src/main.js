/*
 * @Description:
 * @Autor: xiukun@herry
 * @Date: 2021-01-08 10:35:48
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-01-26 10:06:24
 */
import Vue from 'vue';
import Element from 'element-ui';
import './assets/styles/element-variables.scss';
import '@/assets/styles/index.scss'; // global css
import '@/assets/styles/custom.scss'; // 项目提取的自定义css
import App from './App.vue';
import store from './store';
import router from './router';
import permission from './core/directive/permission';
import './core/ajax';

import './icons'; //引入svg图标,需要用svg-sprite-loader做处理
import './permission'; // permission control
import { resetForm } from '@/utils';
Vue.config.productionTip = false;
Vue.use(permission);
Vue.use(Element, {
	size: 'small', // 设置 element-ui 默认size (medium,small))
});

//全局挂载
Vue.prototype.resetForm = resetForm;

Vue.prototype.msgSuccess = function(msg) {
	this.$message({ showClose: true, message: msg, type: 'success' });
};

Vue.prototype.msgError = function(msg) {
	this.$message({ showClose: true, message: msg, type: 'error' });
};

Vue.prototype.msgInfo = function(msg) {
	this.$message.info(msg);
};

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
