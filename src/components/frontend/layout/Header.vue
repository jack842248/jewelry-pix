<template>
    <header class="index-banner">
        <div class="container">
            <Navbar></Navbar>
            <Jumbotron v-if="isHome"></Jumbotron>
        </div>
    </header>
</template>

<script>
import Navbar from '@/components/frontend/layout/Navbar.vue';
import Jumbotron from '@/components/frontend/layout/Jumbotron.vue';

export default{
    components: {
        Navbar,
        Jumbotron
    },
    computed:{
        isHome: function(){
            return this.$route.path == '/'
        }
    }
}
</script>