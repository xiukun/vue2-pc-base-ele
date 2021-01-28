/*
 * @Description:
 * @Autor: xiukun@herry
 * @Date: 2021-01-08 10:35:48
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-01-13 18:08:38
 */
const plugins = [
	[
		'component',
		{
			libraryName: 'element-ui',
			styleLibraryName: 'theme-chalk',
		},
	],
	'lodash',
];
// 生产环境移除console
if (process.env.NODE_ENV === 'production') {
	plugins.push('transform-remove-console');
}

module.exports = {
	presets: ['@vue/cli-plugin-babel/preset'],
	plugins,
};
