/*
 * @Description:角色权限处理
 * @Autor: xiukun@herry
 * @Date: 2021-01-08 16:49:45
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-01-08 18:46:42
 */

import store from '@/store';

export default {
	inserted(el, binding) {
		const { value } = binding;
		const super_admin = 'admin';
		const roles = store.getters && store.getters.roles;

		if (value && value instanceof Array && value.length > 0) {
			const roleFlag = value;

			const hasRole = roles.some((role) => {
				return super_admin === role || roleFlag.includes(role);
			});

			if (!hasRole) {
				el.parentNode && el.parentNode.removeChild(el);
			}
		} else {
			throw new Error(`请设置角色权限标签值"`);
		}
	},
};
