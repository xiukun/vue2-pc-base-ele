/*
 * @Description:
 * @Autor: xiukun@herry
 * @Date: 2021-01-08 13:36:56
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-01-21 09:14:51
 */
// 'use strict';
const path = require('path');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development'; //是否开发环境
function resolve(dir) {
	return path.join(__dirname, dir);
}
const defaultSettings = require('./src/settings.js'); //全局设置文件
const name = defaultSettings.title || '管理系统'; // 标题
const cdn = defaultSettings.cdn; //cdn设置
module.exports = {
	// 在npm run build 或 yarn build 时 ，生成文件的目录名称（要和baseUrl的生产环境路径一致）（默认dist）
	outputDir: 'dist',
	// 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
	assetsDir: 'static',
	// 是否开启eslint保存检测，有效值：ture | false | 'error'
	lintOnSave: isDev,
	// 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
	// productionSourceMap: false,
	devServer: {
		port: 9020,
		// 如果您想启用代理，请删除 mockjs /src/main.jsL11
		// proxy: {
		//   '/api': {
		//     target: 'https://mock.ihx.me/mock/5baf3052f7da7e07e04a5116/antd-pro',
		//     ws: false,
		//     changeOrigin: true
		//   }
		// }
	},
	configureWebpack: {
		name: name,
		resolve: {
			alias: {
				// 别名
				'@': resolve('src'),
				'@api': resolve('src/api'),
				'@com': resolve('src/components'),
				'@core': resolve('src/core'),
				'@store': resolve('src/store'),
				'@views': resolve('src/views'),
			},
		},
		entry: {
			app: ['babel-polyfill', resolve('./src/main.js')],
		},
		externals: !isDev ? cdn.externals : {},
	},
	chainWebpack: (config) => {
		let iconDir = resolve('src/icons');
		config.module.rules.delete('svg'); // 重点:删除默认配置中处理svg,
		config.module
			.rule('svg-sprite-loader')
			.test(/\.svg$/)
			.include.add(iconDir) // 处理svg目录
			.end()
			.use('svg-sprite-loader')
			.loader('svg-sprite-loader')
			.options({
				symbolId: 'icon-[name]',
			});

		//--------------------
		if (!isDev) {
			//非开发环境
			config
				.plugin('loadshReplace')
				.use(new LodashModuleReplacementPlugin());
			config.optimization.splitChunks({
				chunks: 'all',
				cacheGroups: {
					libs: {
						name: 'chunk-libs',
						test: /[\\/]node_modules[\\/]/,
						priority: 10,
						chunks: 'initial',
					},
					commons: {
						name: 'chunk-commons',
						test: /[\\/]src[\\/]js[\\/]/,
						minChunks: 2, //  minimum common number
						priority: 5,
						reuseExistingChunk: true,
					},
				},
			});

			config.plugin('html').tap((args) => {
				args[0].cdn = cdn;
				return args;
			});
		}
		config.optimization.runtimeChunk('single'),
			{
				from: resolve('./public/robots.txt'), // 防爬虫文件
				to: './', // 到根目录下
			};
	},
	css: {
		loaderOptions: {
			sass: {
				prependData: '@import "@/assets/styles/themes.scss";',
			},
		},
	},
};
