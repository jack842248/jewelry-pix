<template>
    <main class="index-texture">
        <!-- 優勢 -->
        <div class="container pb-7" style="margin-top:-5rem">
            <div class="bg-white shadow-sm p-4">
                <ul class="row justify-content-center list-unstyled"> 
                    <li class="col-md-4 text-center">
                        <div class="text-main03 p-4">
                            <i class="fas fa-thumbs-up fa-2x"></i>
                        </div>
                        
                        <h2 class="text-main02 h5">精美包裝</h2>
                        <p class="text-dark">
                            每件飾品都附有高級象牙背卡
                            <br>外層加厚PP透明袋保護
                        </p>
                    </li>
                    <li class="col-md-4 text-center">
                        <div class="text-main03 p-4">
                            <i class="fas fa-shipping-fast fa-2x"></i>
                        </div>
                        
                        <h2 class="text-main02 h5">快速出貨</h2>
                        <p class="text-dark">
                            當我們收到訂單後隔日即出貨
                            <br>讓您能快速的收到商品
                        </p>
                    </li>
                    <li class="col-md-4 text-center">
                        <div class="text-main03 p-4">
                            <i class="fas fa-sync-alt fa-2x"></i>
                        </div>
                        
                        <h2 class="text-main02 h5">只退不換</h2>
                        <p class="text-dark">
                            若收到商品後有任何疑慮
                            <br>在七天內都可直接進行退貨處理
                        </p>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 分類專區 -->
        <div class="container pb-7">
            <div class="text-center">
                <h2 class="h2 text-main02 mb-4">分類專區</h2>
            </div>
            <div class="form-row gap-2">
                <div class="col-md-6">
                    <router-link to="/store/clip-on-earrings">
                        <img class="img-fluid" :src="require('@/assets/images/img-theme-clip-on-earrings.jpg')" alt="耳夾耳環系列">
                    </router-link>
                </div>
                <div class="col-md-6">
                    <router-link to="/store/crystal-bracelets">
                        <img class="img-fluid" :src="require('@/assets/images/img-theme-crystal-bracelets.jpg')" alt="水晶手環">
                    </router-link>
                </div>
                <div class="col-md-6">
                    <router-link to="/store/christmas-spin">
                        <img class="img-fluid" :src="require('@/assets/images/img-theme-christmas-spin.jpg')" alt="聖誕轉轉">
                    </router-link>
                </div>
                <div class="col-md-6">
                    <router-link to="/store/sterling-silver">
                        <img class="img-fluid" :src="require('@/assets/images/img-theme-sterling-silver.jpg')" alt="925銀飾">
                    </router-link>
                </div>
            </div>
        </div>
        <!-- 人氣商品 -->
        <div class="container pb-7">
            <div class="text-center">
                <h3 class="h2 text-main02 mb-4">人氣商品</h3>
            </div>
            <div class="row gap-4">
                <div v-for="item in products" :key="item.id" class="col-6 col-md-3">
                    <div class="card">
                        <button
                            type="button"
                            class="card-img-top border-0 p-0"
                            @click="openProductDetail(item.id)">
                            <img class="img-fluid" :src="item.imageUrl" alt="">
                        </button>
                        <div class="card-body text-center">
                            <h3 class="card-title h6 text-nowrap">{{ item.title }}</h3>
                            <p class="card-text">
                                <del class="small">NT{{ item.origin_price | currency }}</del>
                                <strong class="text-main05">NT{{ item.price | currency }}</strong>
                            </p>
                            <button
                                type="button"
                                class="btn btn-main01"
                                @click="addToCart(item.id)">
                                加入購物車
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ProductDetailModal :item="tempProduct"></ProductDetailModal>
    </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ProductDetailModal from '@/components/frontend/ProductDetailModal.vue'

export default {
    components:{
        ProductDetailModal
    },
    data: function(){
        return{
            sortBy: 'price-asc'
        }
    },
    methods:{
        async addToCart(id,qty = 1){
            try {
                const res = await this.$store.dispatch('frontend/addToCart',{id,qty});
                if(res.data.success){
                    this.$store.dispatch('frontend/getCarts');
                    this.$bus.$emit('message:push', res.data.message, 'success');
                }else{
                    this.$bus.$emit('message:push', res.data.message, 'danger');
                }
            } catch (error) {
                console.error('加入購物車失敗',error)
            }
        },
        async openProductDetail(id){
            try {
                const res = await this.$store.dispatch('frontend/openProductDetail',id);
                if(res.data.success){
                    $('#productDetailModal').modal('show');
                }
            } catch (error) {
                console.error('打開購物車失敗',error)
            }
        },
        ...mapActions('frontend',['getProducts']),
    },
    computed:{
        products: function(){
            return this.$store.state.frontend.products.slice(0,4);
        },
        ...mapGetters('frontend',['carts','tempProduct'])
    },
    created(){
        this.getProducts();
    }
}
</script>