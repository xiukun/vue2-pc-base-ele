/*
 * @Description:配置文件
 * @Autor: xiukun@herry
 * @Date: 2021-01-08 14:33:37
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-01-28 10:47:54
 */
module.exports = {
	title: '国电商户管理系统',

	/**
	 * 侧边栏主题 深色主题theme-dark，浅色主题theme-light
	 */
	sideTheme: 'theme-dark',

	/**
	 * 是否系统布局配置
	 */
	showSettings: false,

	/**
	 * 是否显示 tagsView
	 */
	tagsView: true,

	/**
	 * 是否显示logo
	 */
	sidebarLogo: true,

	/**
	 * @type {string | array} 'production' | ['production', 'development']
	 * @description Need show err logs component.
	 * The default is only used in the production env
	 * If you want to also use it in dev, you can pass ['production', 'development']
	 */
	errorLog: 'production',
	cdn: {
		// webpack build externals
		externals: {
			vue: 'Vue',
			'vue-router': 'VueRouter',
			vuex: 'Vuex',
			axios: 'axios',
			nprogress: 'NProgress',
			'js-cookie': 'Cookies',
		},
		css: ['https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.css'],
		js: [
			'//cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
			'//cdn.jsdelivr.net/npm/vue-router@3.2.0/dist/vue-router.min.js',
			'//cdn.jsdelivr.net/npm/vuex@3.4.0/dist/vuex.min.js',
			'//cdn.jsdelivr.net/npm/axios@0.21.1/dist/axios.min.js',
			'//cdn.jsdelivr.net/npm/nprogress@0.2.0/nprogress.min.js',
			'//cdn.jsdelivr.net/npm/js-cookie@2.2.1/src/js.cookie.min.js',
		],
	},
};
