<template>
    <nav
        class="fixed-top navbar navbar-expand-md py-0"
        :class="navbarClasses"
        ref="navbarMenu">
        <div 
            class="container d-flex align-items-center py-4"
            :class="navbarBorderClass">
            <h1 class="logo mb-0 order-2 order-md-1">
                <router-link
                    to="/"
                    class="navbar-brand"
                    :style="{ backgroundImage:`url(${navbarLogoUrl})`}">JewelryPix
                </router-link>
            </h1>
            <button
                class="navbar-toggler order-1"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <button
                type="button"
                class="text-main03 bg-transparent border-0 order-3 order-md-3 position-relative"
                @click="offcanvas = true">
                <i class="fas fa-shopping-bag fa-lg"></i>
                <small v-if="carts.carts.length" class="carts-num">{{ carts.carts.length }}</small>
            </button>
            <div
                class="offcanvas-overlay"
                :class="offcanvas?'show':''">
                <div
                    class="offcanvas"
                    :class="offcanvas?'show':''"
                    id="offcanvasRight">
                    <div class="d-flex align-items-center p-3">
                        <button
                            type="button"
                            class="bg-transparent border-0"
                            @click="offcanvas = false">
                            <i class="fas fa-times fa-lg"></i>
                            <span class="small pl-1">Close</span>
                        </button>
                    </div>
                    <div class="d-flex flex-column flex-grow-1 h-100 overflow-auto">
                        <table v-if="carts.carts.length" class="table table-sm table-borderless">
                            <tbody>
                                <tr
                                    v-for="item in carts.carts"
                                    :key="item.id">
                                    <td class="align-middle" width="15%">
                                        <img class="img-md" :src="item.product.imageUrl" alt="">
                                    </td>
                                    <td class="align-middle" width="75%">
                                        <p class="mb-0">{{ item.product.title }}</p>
                                        <small class="text-gray-600">NT{{ item.product.price | currency }}</small>
                                    </td>
                                    <td class="align-middle small text-right" width="5%">
                                        <div class="text-center border" style="width:25px">
                                            {{ item.qty }}
                                        </div>
                                    </td>
                                    <td class="align-middle small text-right" width="5%">                     
                                        <button
                                            type="button"
                                            class="btn"
                                            @click="removeCart(item.id)">
                                            <i class="fas fa-times fa-sm"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div v-else class="d-flex justify-content-center align-items-center h-100">
                            <p 
                                class="small text-gray-600">
                                目前購物車內無商品
                            </p>
                        </div>
                    </div>
                    <div
                        v-if="carts.carts.length"
                        class="p-3">
                        <div class="d-flex justify-content-between">
                            <p>總共 {{ (carts.carts && carts.carts.length) || 0 }} 項</p>
                            <p class="text-main05">小計 NT{{ carts.total | currency }}</p>
                        </div>
                        <button
                            type="button"
                            class="btn btn-outline-main01 btn-block"
                            active-class=""
                            @click="checkout(false)">
                            查看購物車
                        </button>
                        <button
                            type="button"
                            class="btn btn-main01 btn-block"
                            @click="checkout(true)">
                            前往結帳
                        </button>
                    </div>
                </div>
            </div>
            <div
                id="navbarNav"
                class="collapse navbar-collapse justify-content-center justify-content-md-end justify-content-xl-center order-md-2"
                ref="navbarNav">
                <ul class="navbar-nav ml-md-auto mr-md-auto">
                    <li class="nav-item">
                        <router-link 
                            to="/store/earrings"
                            class="nav-link">耳環
                            <span v-if="screenSize !== 'lg'" class="small">｜Earrings</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link 
                            to="/store/rings"
                            class="nav-link">戒指
                            <span v-if="screenSize !== 'lg'" class="small">｜Rings</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link 
                            to="/store/necklace"
                            class="nav-link">項鍊
                            <span v-if="screenSize !== 'lg'" class="small">｜Necklace</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link 
                            to="/store/bracelet"
                            class="nav-link">手鍊
                            <span v-if="screenSize !== 'lg'" class="small">｜Bracelet</span>
                        </router-link>
                    </li>
                </ul>
                <button
                    type="button"
                    class="navbar-toggler navbar-close"
                    data-toggle="collapse"
                    data-target="#navbarNav">
                </button>
            </div>
        </div>
    </nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default{
    data: function(){
        return{
            isScrolled: true,
            screenSize: 'md',
            offcanvas: false
        }
    },
    methods:{
        handleScroll: function(){
            if(document.documentElement.scrollTop > 0){
                this.isScrolled = true
            }else{
                this.isScrolled = false;
            }
        },
        handleResize: function(){
            if(window.innerWidth <= 767){
                this.screenSize = 'md';
            }else if(window.innerWidth <= 992){
                this.screenSize = 'lg';
            }else{
                this.screenSize = 'xl';
            }
        },
        getCarts: function(){
            this.$store.dispatch('frontend/getCarts');
        },
        async removeCart(id){
            try {
                const res = await this.$store.dispatch('frontend/removeCart',{id});
                if(res.data.success){
                    this.$bus.$emit('message:push', res.data.message, 'success');
                    this.getCarts();
                }else{
                    this.$bus.$emit('message:push', res.data.message, 'danger');
                }
            } catch (error) {
                console.error('刪除購物車失敗',error);
            }
        },
        checkout(boolean){
            this.$store.dispatch('frontend/checkout',boolean);
            if (this.$route.path !== '/carts') {
                this.$router.push('/carts');
            }
            this.offcanvas = false;
        }
    },
    computed:{
        isHome: function(){
            return this.$route.path == '/'
        },
        navbarClasses: function(){
            if(this.isHome){
                return this.isScrolled? 'navbar-light bg-gray-100 shadow-sm':'navbar-dark'
            }else{
                return 'navbar-light bg-gray-100 shadow-sm'
            }
        },
        navbarBorderClass: function(){
            if(this.isHome){
                return this.isScrolled? '':'border-bottom'
            }else{
                return ''
            }
        },
        navbarLogoUrl: function(){
            if(this.isHome){
                return this.isScrolled
                ? require('@/assets/images/logo-b.png')
                : require('@/assets/images/logo-y.png')
            }else{
                return require('@/assets/images/logo-b.png')
            }
        },
        ...mapGetters('frontend',['carts'])
    },
    watch:{
        $route: function(){
            if(this.screenSize == 'md'){
                this.$refs.navbarNav.classList.remove('show');
            }
            this.offcanvas = false;
        }
    },
    created(){
        this.getCarts();
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
        window.addEventListener('resize', this.handleResize);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleResize);
    }
}
</script>
