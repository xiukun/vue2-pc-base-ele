/*
 * @Description:操作权限处理
 * @Autor: xiukun@herry
 * @Date: 2021-01-08 16:49:45
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-01-08 18:47:20
 */

import store from '@/store';

export default {
	inserted(el, binding) {
		const { value } = binding;
		const all_permission = '*:*:*';
		const permissions = store.getters && store.getters.permissions;

		if (value && value instanceof Array && value.length > 0) {
			const permissionFlag = value;

			const hasPermissions = permissions.some((permission) => {
				return (
					all_permission === permission ||
					permissionFlag.includes(permission)
				);
			});

			if (!hasPermissions) {
				el.parentNode && el.parentNode.removeChild(el);
			}
		} else {
			throw new Error(`请设置操作权限标签值`);
		}
	},
};
