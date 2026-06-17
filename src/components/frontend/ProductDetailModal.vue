<template>
    <div id="productDetailModal" class="modal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header border-bottom-0">
                    <h5 class="modal-title">{{ modalData.title }}</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span>&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <img :src="item.imageUrl" class="img-fluid mb-3" alt="">
                    <div class="d-flex justify-content-between align-items-baseline mb-2">
                        <del class="h6" v-if="item.price">NT{{ modalData.origin_price | currency  }}</del>
                        <div class="h5 text-main05" v-if="item.price">NT{{ modalData.price | currency }}</div>
                    </div>
                    <blockquote class="blockquote mb-4">
                        <p class="text-main01 mb-1" style="white-space: pre-line;">{{ modalData.description }}</p>
                        <footer class="blockquote-footer">{{ modalData.content }}</footer>
                    </blockquote>
                    <!-- <select class="custom-select w-100" v-model="modalData.num">
                        <option value="" disabled>請選擇數量</option>
                        <option :value="num" v-for="num in 10" :key="num">
                            選購{{ num }}{{ modalData.unit }}
                        </option>
                    </select> -->
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center">
                            <button
                                type="button"
                                class="img-sm border-0 bg-gray-200 rounded" @click="updateQuantity(false)">
                                <i
                                    style="transform: translateY(-1px);"
                                    class="fas fa-minus fa-xs"></i>
                            </button>
                            <div
                                style="width: 100px;height: 30px;line-height: 2;"
                                class="text-center bg-gray-100">
                                {{ modalData.num }}
                            </div>
                            <button
                                ype="button"
                                class="img-sm border-0 bg-gray-200 rounded"
                                @click="updateQuantity(true)">
                                <i
                                    style="transform: translateY(-1px);"
                                    class="fas fa-plus fa-xs"></i>
                            </button>
                        </div>
                        <div class="text-nowrap">
                            小計 <strong>{{ modalData.num * modalData.price | currency }}</strong>元
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button 
                        type="button"
                        class="btn btn-main01 flex-grow-1"
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
            modalData: {
                num: 0
            }
        }
    },
    methods:{
        updateQuantity(boolean){
            if(boolean){
                this.modalData.num += 1;
            }else{
                if(this.modalData.num == 0){
                    return
                }
                this.modalData.num -= 1;
            }
        },
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