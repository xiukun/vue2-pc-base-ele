/*
 * @Description:vuex系统主体风格变量配置
 * @Autor: xiukun@herry
 * @Date: 2021-01-08 16:04:34
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-01-08 18:42:27
 */
import variables from '@/assets/styles/element-variables.scss';
import defaultSettings from '@/settings';

const { sideTheme, showSettings, tagsView, sidebarLogo } = defaultSettings;

const state = {
	theme: variables.theme,
	sideTheme: sideTheme,
	showSettings: showSettings,
	tagsView: tagsView,
	sidebarLogo: sidebarLogo,
};

const mutations = {
	CHANGE_SETTING: (state, { key, value }) => {
		// if (state.hasOwnProperty(key)) {
		if (Object.prototype.hasOwnProperty.call(state, key)) {
			state[key] = value;
		}
	},
};

const actions = {
	changeSetting({ commit }, data) {
		commit('CHANGE_SETTING', data);
	},
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
};
