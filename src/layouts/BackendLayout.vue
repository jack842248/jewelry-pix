<template>
    <div>
        <Navbar></Navbar>
        <main class="p-3 pb-7">
            <router-view></router-view>
        </main>
        <Sidebar class="position-fixed" style="left:0px;right:0px;bottom:0px"></Sidebar>
    </div>
</template>

<script>
import Navbar from '@/components/backend/layout/Navbar.vue'
import Sidebar from '@/components/backend/layout/Sidebar.vue';


export default{
    components:{
        Navbar,
        Sidebar
    }
}
</script>