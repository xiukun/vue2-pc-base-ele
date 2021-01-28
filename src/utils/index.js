/*
 * @Description: 工具类
 * @Autor: xiukun@herry
 * @Date: 2021-01-08 17:01:49
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-01-26 09:33:13
 */

/**
 * 重置表单
 * @param {*} refName form ref
 */
export function resetForm(refName) {
	if (this.$refs[refName]) {
		this.$refs[refName].resetFields();
	}
}
