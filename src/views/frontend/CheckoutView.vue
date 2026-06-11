<template>
    <div style="margin-top: 90px">
        <section class="mb-5">
            <div class="container">
                <div class="py-5">
                    <div class="text-center">
                        <h3 v-if="!order.is_paid" class="text-main05">訂單建立成功</h3>
                        <h3 v-else class="text-main05">付款成功！感謝您的購買</h3>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-md-8">
                            <table class="table table-borderless small">
                                <tr>
                                    <th>訂單編號</th>
                                    <td>{{ order.id }}</td>
                                </tr>
                                <tr>
                                    <th>訂單建立時間</th>
                                    <td>{{ new Date(order.create_at * 1000).toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' }) }}</td>
                                </tr>
                                <tr>
                                    <th>付款狀態</th>
                                    <td>
                                        <span v-if="!order.is_paid" class="text-danger">尚未付款</span>
                                        <span v-else class="text-success">已經付款</span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>購買人姓名</th>
                                    <td>{{ order.user.name }}</td>
                                </tr>
                                <tr>
                                    <th>購買人Email</th>
                                    <td>{{ order.user.email }}</td>
                                </tr>
                                <tr>
                                    <th>收件人電話</th>
                                    <td>{{ order.user.tel }}</td>
                                </tr>
                                <tr>
                                    <th>收件人地址</th>
                                    <td>{{ order.user.address }}</td>
                                </tr>
                                <tr>
                                    <th>備註訊息</th>
                                    <td>{{ order.message }}</td>
                                </tr>
                            </table>
                        </div>
                        <div class="col-md-4">
                            <div class="position-relative w-100 h-100">
                                <div class="pb-5">
                                    <table class="table table-sm table-borderless">
                                        <thead>
                                            <tr>
                                                <th class="small text-main01">購買清單</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="item in order.products" :key="item.id">
                                                <td class="align-middle" width="90%">
                                                    <p class="small mb-0">
                                                        {{ item.product.title }}
                                                    </p>
                                                </td>
                                                <td class="align-middle small text-right" width="10%">
                                                    <div
                                                        class="text-center"
                                                        style="width: 25px">
                                                        x{{ item.qty }}
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <hr>
                                    <div class="small mb-5">
                                        <div class="d-flex justify-content-between mb-2">
                                            <span>總計</span>
                                            <span>NT{{ order.total | currency }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="position-absolute bg-info w-100" style="bottom:0px">
                                    <button
                                        v-if="!order.is_paid"
                                        type="button"
                                        class="btn btn-lg btn-main01 btn-block"
                                        @click="payOrder">
                                        立即結帳
                                    </button>
                                    <router-link
                                        v-else
                                        to="/"
                                        class="btn btn-lg btn-main01 btn-block">再去逛逛
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>


<script>
import { mapGetters } from 'vuex';

export default {
    methods: {
        getOrder() {
            this.$store.dispatch('frontend/getOrder',this.$route.params.orderId);
        },
        async payOrder(){
            try {
                const res = await this.$store.dispatch('frontend/payOrder',this.$route.params.orderId);
                if(res.data.success){
                    this.$bus.$emit('message:push', res.data.message, 'success');
                    this.getOrder();
                }
            } catch (error) {
                console.error('訂單付款失敗',error);
            }
        }
    },
    computed:{
        ...mapGetters('frontend',['order'])
    },
    created(){
        this.getOrder();
    }
};
</script>