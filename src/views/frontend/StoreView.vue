<template>
    <div style="margin-top:90px">
        <section
            class="category-hero"
            :style="{ backgroundImage: `url(${require('@/assets/images/img-store.jpg')})` }">
            <div class="container h-100">
                <div class="row flex-column justify-content-end h-100">
                    <div class="text-right">
                        <h2 class="pr-3">商店</h2>
                        <slot name="breadcrumb"></slot>
                    </div>
                </div>
            </div>
        </section>
        <section class="mb-5">
            <div class="container">
                <div class="pt-5 pb-4">
                    <div class="d-flex justify-content-between align-items-center">
                        <p class="text-main01 mb-0">顯示結果，共{{ products.length }}項</p>
                        <select
                            class="custom-select custom-select-sm"
                            v-model="sortBy">
                            <option value="price-asc">依價格排序低至高</option>
                            <option value="price-desc">依價格排序高至低</option>
                        </select>
                    </div>
                </div>
                <div class="row gap-4">
                    <div
                        v-for="item in sortPrice"
                        :key="item.id"
                        class="col-6 col-md-3">
                        <div class="card">
                            <button
                                type="button"
                                class="card-img-top border-0 p-0"
                                @click="productDetail(item.id)">
                                <img class="img-fluid" :src="item.imageUrl" alt="">
                            </button>
                            <div class="card-body text-center">
                                <h3 class="card-title h6 text-nowrap">{{ item.title }}</h3>
                                <p class="card-text small">
                                    <del>NT{{ item.origin_price | currency }}</del>
                                    <strong class="text-main05">NT${{ item.price | currency }}</strong>
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
        </section>
        <ProductDetailModal :item="tempProduct"></ProductDetailModal>
    </div>
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
        sortPrice: function(){
            return [...this.products].sort((a,b)=>{
                if(this.sortBy == 'price-asc'){
                    return a.price - b.price
                }else{
                    return b.price - a.price
                }
            })
        },
        ...mapGetters('frontend',['carts','products','tempProduct'])
    },
    created(){
        this.getProducts();
    }
}
</script>