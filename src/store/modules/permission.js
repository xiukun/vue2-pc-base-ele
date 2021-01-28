/*
 * @Description:vuex路由配置
 * @Autor: xiukun@herry
 * @Date: 2021-01-08 16:04:34
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-01-13 13:49:22
 */
import { constantRoutes } from '@/router';
// import { getRouters } from '@/api/menu';
import Layout from '@/layout/index';
const ParentView = { render: (h) => h('router-view') };
const permission = {
	state: {
		routes: [],
		addRoutes: [],
		sidebarRouters: [],
	},
	mutations: {
		SET_ROUTES: (state, routes) => {
			state.addRoutes = routes;
			state.routes = constantRoutes.concat(routes);
		},
		SET_SIDEBAR_ROUTERS: (state, routers) => {
			state.sidebarRouters = constantRoutes.concat(routers);
		},
	},
	actions: {
		// 生成路由
		GenerateRoutes({ commit }) {
			return new Promise((resolve) => {
				// [
				// 	{
				// 		name: 'ohter-mana',
				// 		path: '',
				// 		hidden: false,
				// 		// redirect: '/ohter',
				// 		component: 'Layout',
				// 		// alwaysShow: true,
				// 		meta: {
				// 			title: '其他管理',
				// 			icon: 'system',
				// 			noCache: false,
				// 		},
				// 		children: [
				// 			{
				// 				path: '/ohter',
				// 				component: 'other',
				// 				name: '其他',
				// 				hidden: false,
				// 				meta: {
				// 					title: '其他',
				// 					icon: 'dashboard',
				// 					noCache: false,
				// 				},
				// 			},
				// 		],
				// 	},
				// ]
				let s1 = [];
				let s2 = [];
				const sidebarRoutes = filterAsyncRouter(s1);
				const rewriteRoutes = filterAsyncRouter(s2, true);
				rewriteRoutes.push({
					path: '*',
					redirect: '/404',
					hidden: true,
				});
				commit('SET_ROUTES', rewriteRoutes);
				commit('SET_SIDEBAR_ROUTERS', sidebarRoutes);
				resolve(rewriteRoutes);
			});
			// 	return new Promise((resolve) => {
			// 		// 向后端请求路由数据
			// 		getRouters().then((res) => {
			// 			const sdata = JSON.parse(JSON.stringify(res.data));
			// 			const rdata = JSON.parse(JSON.stringify(res.data));
			// 			const sidebarRoutes = filterAsyncRouter(sdata);
			// 			const rewriteRoutes = filterAsyncRouter(rdata, true);
			// 			rewriteRoutes.push({
			// 				path: '*',
			// 				redirect: '/404',
			// 				hidden: true,
			// 			});
			// 			commit('SET_ROUTES', rewriteRoutes);
			// 			commit('SET_SIDEBAR_ROUTERS', sidebarRoutes);
			// 			resolve(rewriteRoutes);
			// 		});
			// 	});
		},
	},
};

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap, isRewrite = false) {
	return asyncRouterMap.filter((route) => {
		if (isRewrite && route.children) {
			route.children = filterChildren(route.children);
		}
		if (route.component) {
			// Layout ParentView 组件特殊处理
			if (route.component === 'Layout') {
				route.component = Layout;
			} else if (route.component === 'ParentView') {
				route.component = ParentView;
			} else {
				route.component = loadView(route.component);
			}
		}
		if (route.children != null && route.children && route.children.length) {
			route.children = filterAsyncRouter(
				route.children,
				route,
				isRewrite
			);
		}
		return true;
	});
}

function filterChildren(childrenMap) {
	var children = [];
	childrenMap.forEach((el) => {
		if (el.children && el.children.length) {
			if (el.component === 'ParentView') {
				el.children.forEach((c) => {
					c.path = el.path + '/' + c.path;
					if (c.children && c.children.length) {
						children = children.concat(
							filterChildren(c.children, c)
						);
						return;
					}
					children.push(c);
				});
				return;
			}
		}
		children = children.concat(el);
	});
	return children;
}

export const loadView = (view) => {
	// 路由懒加载
	return () => import(`@/views/${view}`);
};

export default permission;
