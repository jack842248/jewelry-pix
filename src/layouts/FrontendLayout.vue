<template>
    <div class="wrapper">
        <Header></Header>
        <main>
            <router-view>
                <Breadcrumb
                    v-if="showBreadcrumb"
                    slot="breadcrumb">
                </Breadcrumb>
            </router-view>
        </main>
        <Footer class="mt-auto"></Footer>
    </div>
</template>

<script>
import Header from '@/components/frontend/layout/Header.vue'
import Footer from '@/components/frontend/layout/Footer.vue';
import Breadcrumb from '@/components/frontend/layout/Breadcrumb.vue';

export default{
    components:{
        Header,
        Footer,
        Breadcrumb
    },
    computed:{
        showBreadcrumb: function(){
            return this.$route.meta.breadcrumb
        }
    }
}
</script>