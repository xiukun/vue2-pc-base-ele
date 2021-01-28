/*
 * @Description:修复ios的bug
 * @Autor: xiukun@herry
 * @Date: 2021-01-08 17:28:51
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-01-08 17:40:41
 */
export default {
	computed: {
		device() {
			return this.$store.state.app.device;
		},
	},
	mounted() {
		// 修复ios设备上点击菜单会触发mouseleave的bug
		this.fixBugIniOS();
	},
	methods: {
		fixBugIniOS() {
			const $subMenu = this.$refs.subMenu;
			if ($subMenu) {
				const handleMouseleave = $subMenu.handleMouseleave;
				$subMenu.handleMouseleave = (e) => {
					if (this.device === 'mobile') {
						return;
					}
					handleMouseleave(e);
				};
			}
		},
	},
};
