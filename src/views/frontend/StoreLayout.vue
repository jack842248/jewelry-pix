<template>
    <router-view>
        <Breadcrumb
            v-if="showBreadcrumb"
            slot="breadcrumb">
        </Breadcrumb>
    </router-view>
</template>

<script>
import Breadcrumb from '@/components/frontend/layout/Breadcrumb.vue';

export default{
    components:{
        Breadcrumb
    },
    computed:{
        showBreadcrumb: function(){
            return this.$route.meta.breadcrumb
        }
    }
}
</script>