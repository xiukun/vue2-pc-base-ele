/*
 * @Description: 系统初始变量
 * @Autor: xiukun@herry
 * @Date: 2021-01-08 16:04:34
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-01-15 18:19:28
 */
import Cookies from 'js-cookie';

const state = {
	sidebar: {
		opened: Cookies.get('sidebarStatus')
			? !!+Cookies.get('sidebarStatus')
			: true,
		withoutAnimation: false,
	},
	device: 'desktop',
};

const mutations = {
	TOGGLE_SIDEBAR: (state) => {
		state.sidebar.opened = !state.sidebar.opened;
		state.sidebar.withoutAnimation = false;
		if (state.sidebar.opened) {
			Cookies.set('sidebarStatus', 1);
		} else {
			Cookies.set('sidebarStatus', 0);
		}
	},
	CLOSE_SIDEBAR: (state, withoutAnimation) => {
		Cookies.set('sidebarStatus', 0);
		state.sidebar.opened = false;
		state.sidebar.withoutAnimation = withoutAnimation;
	},
	TOGGLE_DEVICE: (state, device) => {
		state.device = device;
	},
};

const actions = {
	toggleSideBar({ commit }) {
		commit('TOGGLE_SIDEBAR');
	},
	closeSideBar({ commit }, { withoutAnimation }) {
		commit('CLOSE_SIDEBAR', withoutAnimation);
	},
	toggleDevice({ commit }, device) {
		commit('TOGGLE_DEVICE', device);
	},
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
};
