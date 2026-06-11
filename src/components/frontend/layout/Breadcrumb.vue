<template>
    <nav>
        <ol class="breadcrumb justify-content-end">
            <li
                v-for="item in breadcrumbs"
                :key="item.path"
                class="breadcrumb-item">
                <template v-if="activeName == item.name">{{ item.name }}</template>
                <router-link v-else
                    :to="item.path"
                    class="text-main01">
                    {{ item.name }}
                </router-link>
            </li>
        </ol>
    </nav>
</template>

<script>
export default{
    computed:{
        breadcrumbs() {
            const matched = this.$route.matched.filter(route => route.meta.breadcrumb)
            if (this.$route.path === '/store') {
                matched.pop()
            }
            return matched.map(route => ({
                name: route.meta.title,
                path: route.path === '' ? '/' : route.path
            }))
        },
        activeName: function(){
            return this.$route.name
        },
    }
}
</script>