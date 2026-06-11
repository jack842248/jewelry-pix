<template>
    <nav class="navbar navbar-dark sticky-top bg-main01 flex-md-nowrap shadow">
        <div class="container-fluid d-flex align-items-center">
            <h1 class="logo mb-0">
                <router-link
                    to="/"
                    class="navbar-brand"
                    :style="{ backgroundImage: `url(${require('@/assets/images/logo-w.png')})` }">JewelryPix
                </router-link>
            </h1>
            <ul class="navbar-nav ml-auto px-3">
                <li class="nav-item text-nowrap">
                    <a class="nav-link" @click.prevent="signout">
                        <i class="fas fa-sign-out-alt mr-1"></i>登出
                    </a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default{
    methods:{
        async signout(){
            try {
                const res = await this.$store.dispatch('backend/signout');
                if(res.data.success){
                    this.$bus.$emit('message:push', res.data.message, 'success');
                    this.$router.replace('/login');
                }else{
                    this.$bus.$emit('message:push', res.data.message, 'danger');
                }
            } catch (error) {
                console.error('登出失敗', error);
            }
        }
    }
}
</script>