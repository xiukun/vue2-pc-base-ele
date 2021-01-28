/*
 * @Description:
 * @Autor: xiukun@herry
 * @Date: 2021-01-08 10:35:48
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-01-18 13:55:30
 */
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
import Layout from '@/layout';
const syncRoutes = [
	{
		name: 'ohter-mana',
		path: '',
		hidden: false,
		// redirect: '/ohter',
		component: Layout,
		// alwaysShow: true,
		meta: {
			title: '其他管理',
			icon: 'system',
			noCache: false,
		},
		children: [
			{
				path: '/other',
				component: () => import('@/views/other'),
				name: '其他',
				hidden: false,
				meta: {
					title: '其他',
					icon: 'dashboard',
					noCache: false,
				},
			},
		],
	},
	{
		name: 'iframe-mana',
		path: '',
		hidden: false,
		component: Layout,
		meta: {
			title: 'iframe',
			icon: 'system',
			noCache: false,
		},
		children: [
			{
				path: '/iframe1',
				component: () => import('@/views/iframe/layout'),
				name: 'iframe1',
				hidden: false,
				meta: {
					link: 'http://www.baidu.com',
					title: 'iframe1 title',
					icon: 'dashboard',
					noCache: false,
				},
			},
			{
				path: '/iframe2',
				component: () => import('@/views/iframe/layout'),
				name: 'iframe2',
				hidden: false,
				meta: {
					link: 'https://juejin.cn/frontend',
					title: 'iframe2 title',
					icon: 'dashboard',
					noCache: false,
				},
			},
		],
	},
	{
		name: 'ohter-mana2',
		path: '',
		hidden: false,
		// redirect: '/ohter',
		component: Layout,
		// alwaysShow: true,
		meta: {
			title: '其他管理',
			icon: 'system',
			noCache: false,
		},
		children: [
			{
				path: '/other2',
				component: () => import('@/views/other'),
				name: '其他2',
				hidden: false,
				meta: {
					title: '其他2',
					icon: 'dashboard',
					noCache: false,
				},
			},
		],
	},
	{
		name: 'ohter-mana3',
		path: '',
		hidden: false,
		// redirect: '/ohter',
		component: Layout,
		// alwaysShow: true,
		meta: {
			title: '其他管理3',
			icon: 'system',
			noCache: false,
		},
		children: [
			{
				path: '/other3',
				component: () => import('@/views/other'),
				name: '其他3',
				hidden: false,
				meta: {
					title: '其他3',
					icon: 'dashboard',
					noCache: false,
				},
			},
		],
	},
	{
		name: 'ohter-mana4',
		path: '',
		hidden: false,
		// redirect: '/ohter',
		component: Layout,
		// alwaysShow: true,
		meta: {
			title: '其他管理4',
			icon: 'system',
			noCache: false,
		},
		children: [
			{
				path: '/other4',
				component: () => import('@/views/other'),
				name: '其他4',
				hidden: false,
				meta: {
					title: '其他4',
					icon: 'dashboard',
					noCache: false,
				},
			},
		],
	},
	{
		name: 'ohter-mana5',
		path: '',
		hidden: false,
		// redirect: '/ohter',
		component: Layout,
		// alwaysShow: true,
		meta: {
			title: '其他管理5',
			icon: 'system',
			noCache: false,
		},
		children: [
			{
				path: '/other5',
				component: () => import('@/views/other'),
				name: '其他5',
				hidden: false,
				meta: {
					title: '其他5',
					icon: 'dashboard',
					noCache: false,
				},
			},
		],
	},
];
export const constantRoutes = [
	{
		path: '/login',
		component: () => import('@/views/index'),
		hidden: true,
	},
	{
		path: '/404',
		component: () => import('@/views/error/404'),
		hidden: true,
	},
	{
		path: '/redirect',
		component: Layout,
		hidden: true,
		children: [
			{
				path: '/redirect/:path(.*)',
				component: () => import('@/views/redirect'),
			},
		],
	},
	{
		path: '',
		component: Layout,
		redirect: 'index',
		children: [
			{
				path: 'index',
				component: () => import('@/views/index'),
				name: '首页',
				meta: {
					title: '首页',
					icon: 'dashboard',
					noCache: true,
					affix: true,
				},
			},
		],
	},
	...syncRoutes,
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: constantRoutes,
});

export default router;
