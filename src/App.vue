<!--
 * @Description: App.vue
 * @Autor: xiukun@herry
 * @Date: 2021-01-08 10:35:48
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-01-15 16:20:40
-->
<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
import { setToken } from '@/utils/auth';
export default {
    name: 'App',
    provide() {
        // eventBus挂载的事件：
        return {
            eventBus: this.eventBus,
        };
    },
    mounted() {
        setToken('2121211212');
    },
};
</script>
