<template>
    <div style="margin-top: 90px">
        <section v-if="!isContact" class="mb-5">
            <div class="container">
                <div class="py-5">
                    <div class="text-center">
                        <h3 class="mb-5">購物車</h3>
                    </div>
                    <div v-if="!carts.carts.length" class="row">
                        <div class="col-12">
                            <div class="text-center my-5">
                                <p>目前購物車內無商品</p>
                                <router-link
                                    to="/store"
                                    class="btn btn-main01">
                                    去商店逛逛
                                </router-link>
                            </div>
                        </div>
                    </div>
                    <div v-else class="row">
                        <div class="col-md-8">
                            <table class="table table-borderless mb-5">
                                <tbody>
                                    <tr v-for="item in carts.carts" :key="item.id">
                                        <td class="align-middle" width="15%">
                                            <img
                                                class="img-md"
                                                :src="item.product.imageUrl"
                                                alt=""
                                            />
                                        </td>
                                        <td class="align-middle" width="75%">
                                            <p class="mb-0">
                                                {{ item.product.title }}
                                            </p>
                                            <small
                                                v-if="item.coupon"
                                                class="small text-success">
                                                已套用優惠券
                                            </small>
                                            <small class="text-gray-600 mb-0">
                                                NT{{
                                                    item.product.price
                                                        | currency
                                                }}
                                            </small>
                                        </td>
                                        <td class="align-middle small text-right" width="5%">
                                            <div
                                                class="text-center border"
                                                style="width: 25px">
                                                {{ item.qty }}
                                            </div>
                                        </td>
                                        <td class="align-middle small text-right" width="5%">
                                            <button
                                                type="button"
                                                class="btn"
                                                @click="removeCart(item.id)">
                                                <i class="fas fa-times fa-md"></i>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="col-md-4 h-100">
                            <div class="mt-auto">
                                <p v-if="carts.total"
                                    class="h5 mb-4">Total: NT{{ carts.total | currency }}
                                </p>
                                <div class="input-group input-group-sm mb-4">
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="請輸入優惠碼"
                                        v-model="couponCode">
                                    <div class="input-group-append">
                                        <button
                                            type="button"
                                            class="btn btn-main03"
                                            @click="addCouponCode"
                                            :disabled="!couponCode">
                                            套用優惠碼
                                        </button>
                                    </div>
                                </div>
                                <p
                                    v-if="carts.final_total !== carts.total && carts.final_total"
                                    class="h5 text-main05">折扣價: NT{{ carts.final_total | currency }}
                                </p>
                                <hr>
                                <button
                                    type="button"
                                    class="btn btn-block btn-lg btn-main01 mb-4"
                                    @click="isContact = true">
                                    結帳
                                </button>
                                <p class="text-dark small mb-4">
                                    為確保服務品質，商品出貨後恕不接受訂單變更。
                                    退貨申請請於收到商品後 7 日內提出，並保持商品全新與完整包裝。
                                    確認符合退貨條件後將進行退款作業。
                                    數位商品恕不適用退換貨服務。
                                </p>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
        <section v-else class="mb-5">
            <div class="container">
                <div class="py-5">
                    <div class="text-center">
                        <h3 class="mb-5">填寫聯絡資料</h3>
                    </div>
                    <div class="row">
                        <div class="col-md-8">
                            <form @submit.prevent="createOrder">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group flex-grow-1">
                                            <label
                                                for="user_name_last"
                                                class="text-main01">名字
                                            </label>
                                            <input
                                                id="user_name_last"
                                                name="user_name_last"
                                                type="text"
                                                class="form-control form-control-sm"
                                                :class="{'is-invalid': errors.has('user_name_last') }"
                                                v-validate="'required'"
                                                v-model="contactForm.user.name.last">
                                            <span
                                                v-if="errors.has('user_name_last')"
                                                class="small text-danger">此欄位為必填
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group flex-grow-1">
                                            <label for="user_name_first"
                                                class="text-main01">姓氏
                                            </label>
                                            <input
                                                id="user_name_first"
                                                name="user_name_first"
                                                type="text"
                                                class="form-control form-control-sm"
                                                :class="{'is-invalid': errors.has('user_name_first') }"
                                                v-validate="'required'"
                                                v-model="contactForm.user.name.first">
                                            <span
                                                v-if="errors.has('user_name_first')"
                                                class="small text-danger">此欄位為必填
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label
                                        for="user_email"
                                        class="text-main01">Email
                                    </label>
                                    <input
                                        id="user_email"
                                        name="user_email"
                                        type="email"
                                        class="form-control form-control-sm"
                                        :class="{'is-invalid': errors.has('user_email') }"
                                        v-validate="'required|email'"
                                        data-vv-as="Email"
                                        v-model="contactForm.user.email">
                                    <span
                                        v-if="errors.has('user_email')"
                                        class="small text-danger">{{ errors.first('user_email') }}
                                    </span>
                                </div>
                                <div class="form-group">
                                    <label
                                        for="user_tel"
                                        class="text-main01">收件人電話
                                    </label>
                                    <input
                                        id="user_tel"
                                        name="user_tel"
                                        type="text"
                                        class="form-control form-control-sm"
                                        :class="{'is-invalid': errors.has('user_tel') }"
                                        v-validate="'required'"
                                        v-model="contactForm.user.tel">
                                    <span
                                        v-if="errors.has('user_tel')"
                                        class="small text-danger">此欄位為必填
                                    </span>
                                </div>
                                <div class="form-group">
                                    <label
                                        for="user_address"
                                        class="text-main01">收件人地址
                                    </label>
                                    <input
                                        id="user_address"
                                        name="user_address"
                                        type="text"
                                        class="form-control form-control-sm"
                                        :class="{'is-invalid': errors.has('user_address') }"
                                        v-validate="'required'"
                                        v-model="contactForm.user.address">
                                    <span
                                        v-if="errors.has('user_address')"
                                        class="small text-danger">此欄位為必填
                                    </span>
                                </div>
                                <div class="form-group">
                                    <label
                                        for="message"
                                        class="text-main01">留言
                                    </label>
                                    <textarea
                                        id="message"
                                        class="form-control form-control-sm"
                                        rows="6"
                                        v-model="contactForm.message">
                                    </textarea>
                                </div>
                            </form>
                        </div>
                        <div class="col-md-4 h-100">
                            <div class="mt-auto">
                                <table class="table table-sm table-borderless">
                                    <thead>
                                        <tr>
                                            <th class="text-main01">購買清單</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in carts.carts" :key="item.id">
                                            <td class="align-middle" width="90%">
                                                <p class="mb-0">
                                                    {{ item.product.title }}
                                                </p>
                                            </td>
                                            <td class="align-middle text-right" width="10%">
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
                                <div class="mb-5">
                                    <div class="d-flex justify-content-between mb-2">
                                        <span>小計</span>
                                        <span v-if="carts.total">NT{{ carts.total | currency }}</span>
                                    </div>
                                    <div
                                        v-if="carts.final_total !== carts.total"
                                        class="d-flex justify-content-between mb-2 text-main05">
                                        <span>折扣</span>
                                        <span>NT{{ carts.total - carts.final_total | currency }}</span>
                                    </div>
                                    <div class="d-flex justify-content-between mb-2 ">
                                        <strong>總計</strong>
                                        <strong>NT{{ carts.final_total | currency }}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            <button
                                type="button"
                                class="btn btn-lg btn-outline-main01 btn-block mb-4"
                                @click="isContact = false">
                                回購物車
                            </button>
                        </div>
                        <div class="col-md-3 offset-md-6">
                            <div class="text-right">
                                <button
                                    type="button"
                                    class="btn btn-lg btn-main01 btn-block mb-4"
                                    @click="createOrder">
                                    確認送出
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    data: function () {
        return {
            couponCode: '',
            contactForm: {
                user:{
                    name:{
                        first: '',
                        last: ''
                    },
                    email: '',
                    tel: '',
                    address: ''
                },
                message: ''
            },
            isContact: false
        };
    },
    methods: {
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
        async addCouponCode(){
            try {
                const res = await this.$store.dispatch('frontend/addCouponCode',this.couponCode);
                if(res.data.success){
                    this.$bus.$emit('message:push', res.data.message, 'success');
                    this.getCarts();
                }else{
                    this.$bus.$emit('message:push', res.data.message, 'danger');
                }
            } catch (error) {
                console.error('套用優惠券失敗',error);
            }
        },
        async createOrder(){
            const valid = await this.$validator.validate();
            if(!valid){
                return
            }else{
                try {
                    const res = await this.$store.dispatch('frontend/createOrder',
                        {
                            data: {
                                user:{
                                    name: this.contactForm.user.name.first + this.contactForm.user.name.last,
                                    email: this.contactForm.user.email,
                                    tel: this.contactForm.user.tel,
                                    address: this.contactForm.user.address
                                },
                                message: this.contactForm.message
                            }
                        }
                    );
                    if(res.data.success){
                        this.$bus.$emit('message:push',res.data.message,'success');
                        this.$router.push(`checkout/${res.data.orderId}`)
                    }else{
                        this.$bus.$emit('message:push',res.data.message,'danger');
                    }
                } catch (error) {
                    console.error('建立訂單失敗',error);
                }
            }
        },
        ...mapActions('frontend',['getCarts'])
    },
    computed:{
        ...mapGetters('frontend',['carts'])
    },
    created() {
        this.getCarts();
    },
};
</script>