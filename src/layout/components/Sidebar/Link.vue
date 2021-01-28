<!--
 * @Description: 
 * @Autor: xiukun@herry
 * @Date: 2021-01-08 17:28:51
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-01-08 17:45:35
-->
<template>
    <component :is="type" v-bind="linkProps(to)">
        <slot />
    </component>
</template>

<script>
import { isExternal } from '@/utils/validate';

export default {
    props: {
        to: {
            type: String,
            required: true,
        },
    },
    computed: {
        isExternal() {
            return isExternal(this.to);
        },
        type() {
            if (this.isExternal) {
                return 'a';
            }
            return 'router-link';
        },
    },
    methods: {
        linkProps(to) {
            if (this.isExternal) {
                return {
                    href: to,
                    target: '_blank',
                    rel: 'noopener',
                };
            }
            return {
                to: to,
            };
        },
    },
};
</script>
