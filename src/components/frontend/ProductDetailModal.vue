<template>
    <div id="productDetailModal" class="modal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header border-bottom-0">
                    <h5 class="modal-title">{{ modalData.title }}</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span>&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <img :src="item.imageUrl" class="img-fluid" alt="">
                    <blockquote class="blockquote mt-3">
                        <p class="mb-0">{{ modalData.content }}</p>
                        <footer class="blockquote-footer text-right">{{ modalData.description }}</footer>
                    </blockquote>
                    <div class="d-flex justify-content-between align-items-baseline">
                        <del class="h6" v-if="item.price">NT{{ modalData.origin_price | currency  }}</del>
                        <div class="h5 text-main05" v-if="item.price">NT{{ modalData.price | currency }}</div>
                    </div>
                    <select class="custom-select w-100 mt-3" v-model="modalData.num">
                        <option value="" disabled>請選擇數量</option>
                        <option :value="num" v-for="num in 10" :key="num">
                            選購{{ num }}{{ modalData.unit }}
                        </option>
                    </select>
                </div>
                <div class="modal-footer border-top-0">
                    <div class="small text-nowrap mr-3">
                        小計 <strong>{{ modalData.num * modalData.price | currency }}</strong>元
                    </div>
                    <button 
                        type="button"
                        class="btn btn-main01"
                        data-dismiss="modal"
                        :disabled="modalData.num == 0"
                        @click="addToCart(modalData.id,modalData.num)">加入購物車
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    props: ['item'],
    data: function(){
        return{
            modalData: {}
        }
    },
    methods:{
        async addToCart(id,qty){
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
            } finally {
                $('#productDetailModal').modal('hide');
            }
        }
    },
    watch:{
        item:{
            immediate: true,
            handler(newVal) {
                this.modalData = {
                    ...newVal
                }
            }
        }
    }
}
</script>