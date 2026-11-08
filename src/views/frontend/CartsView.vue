<template>
  <div style="margin-top: 90px">
    <section v-if="!isContact || !carts.carts.length" class="mb-5">
      <div class="container">
        <div class="py-5">
          <div class="text-center">
            <h3 class="mb-5">購物車</h3>
          </div>
          <div v-if="!carts.carts.length" class="row">
            <div class="col-12">
              <div class="text-center my-5">
                <p>目前購物車內無商品</p>
                <router-link to="/store" class="btn btn-main01">
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
                        :alt="item.product.title"
                      />
                    </td>
                    <td class="align-middle" width="75%">
                      <p class="mb-0">
                        {{ item.product.title }}
                      </p>
                      <small v-if="item.coupon" class="small text-success">
                        已套用優惠券
                      </small>
                      <small class="text-gray-600 mb-0">
                        NT{{ item.product.price | currency }}
                      </small>
                    </td>
                    <td class="align-middle small text-right" width="5%">
                      <div class="d-flex align-items-center">
                        <button
                          type="button"
                          class="img-sm flex-shrink-0 border-0 bg-gray-200 rounded"
                          :disabled="isUpdatingCart || item.qty <= 1"
                          :aria-label="`減少 ${item.product.title} 的數量`"
                          @click="updateQuantity(item, -1)"
                        >
                          <i class="fas fa-minus fa-xs" aria-hidden="true"></i>
                        </button>
                        <div
                          class="text-center bg-gray-100 flex-shrink-0"
                          style="
                            min-width: 40px;
                            height: 30px;
                            line-height: 2.5;
                          "
                          aria-live="polite"
                        >
                          {{ item.qty }}
                        </div>
                        <button
                          type="button"
                          class="img-sm flex-shrink-0 border-0 bg-gray-200 rounded"
                          :disabled="isUpdatingCart"
                          :aria-label="`增加 ${item.product.title} 的數量`"
                          @click="updateQuantity(item, 1)"
                        >
                          <i class="fas fa-plus fa-xs" aria-hidden="true"></i>
                        </button>
                      </div>
                    </td>
                    <td class="align-middle small text-right" width="5%">
                      <button
                        type="button"
                        class="btn"
                        :disabled="isUpdatingCart"
                        @click="removeCart(item.id)"
                      >
                        <i class="fas fa-times fa-md"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-md-4 h-100">
              <div class="mt-auto">
                <p v-if="carts.total" class="h5 mb-4">
                  Total: NT{{ carts.total | currency }}
                </p>
                <div class="input-group input-group-sm mb-4">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="請輸入優惠碼"
                    v-model="couponCode"
                  />
                  <div class="input-group-append">
                    <button
                      type="button"
                      class="btn btn-main03"
                      @click="addCouponCode"
                      :disabled="!couponCode"
                    >
                      套用優惠碼
                    </button>
                  </div>
                </div>
                <p
                  v-if="carts.final_total !== carts.total && carts.final_total"
                  class="h5 text-main05"
                >
                  折扣價: NT{{ carts.final_total | currency }}
                </p>
                <hr />
                <button
                  type="button"
                  class="btn btn-block btn-lg btn-main01 mb-4"
                  @click="checkout(true)"
                >
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
                        class="text-main01 form-required"
                        >名字
                      </label>
                      <input
                        id="user_name_last"
                        placeholder="請輸入收件人名字"
                        name="user_name_last"
                        type="text"
                        class="form-control form-control-sm"
                        :class="{ 'is-invalid': errors.has('user_name_last') }"
                        v-validate="'required'"
                        v-model="contactForm.user.name.last"
                        aria-required="true"
                      />
                      <span
                        v-if="errors.has('user_name_last')"
                        class="small text-danger"
                        >此欄位為必填
                      </span>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group flex-grow-1">
                      <label
                        for="user_name_first"
                        class="text-main01 form-required"
                        >姓氏
                      </label>
                      <input
                        id="user_name_first"
                        placeholder="請輸入收件人姓氏"
                        name="user_name_first"
                        type="text"
                        class="form-control form-control-sm"
                        :class="{ 'is-invalid': errors.has('user_name_first') }"
                        v-validate="'required'"
                        v-model="contactForm.user.name.first"
                        aria-required="true"
                      />
                      <span
                        v-if="errors.has('user_name_first')"
                        class="small text-danger"
                        >此欄位為必填
                      </span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label for="user_email" class="text-main01 form-required"
                    >Email
                  </label>
                  <input
                    id="user_email"
                    placeholder="例如：name@example.com"
                    name="user_email"
                    type="email"
                    class="form-control form-control-sm"
                    :class="{ 'is-invalid': errors.has('user_email') }"
                    v-validate="'required|email'"
                    data-vv-as="Email"
                    v-model="contactForm.user.email"
                    aria-required="true"
                  />
                  <span
                    v-if="errors.has('user_email')"
                    class="small text-danger"
                    >{{ errors.first("user_email") }}
                  </span>
                </div>
                <div class="form-group">
                  <label for="user_tel" class="text-main01 form-required"
                    >收件人電話
                  </label>
                  <input
                    id="user_tel"
                    placeholder="例如：0912345678"
                    name="user_tel"
                    type="tel"
                    class="form-control form-control-sm"
                    :class="{ 'is-invalid': errors.has('user_tel') }"
                    v-validate="'required'"
                    v-model="contactForm.user.tel"
                    aria-required="true"
                  />
                  <span v-if="errors.has('user_tel')" class="small text-danger"
                    >此欄位為必填
                  </span>
                </div>
                <div class="form-group">
                  <label for="user_address" class="text-main01 form-required"
                    >收件人地址
                  </label>
                  <input
                    id="user_address"
                    placeholder="請輸入完整地址，包含縣市、區及門牌號碼"
                    name="user_address"
                    type="text"
                    class="form-control form-control-sm"
                    :class="{ 'is-invalid': errors.has('user_address') }"
                    v-validate="'required'"
                    v-model="contactForm.user.address"
                    aria-required="true"
                  />
                  <span
                    v-if="errors.has('user_address')"
                    class="small text-danger"
                    >此欄位為必填
                  </span>
                </div>
                <div class="form-group">
                  <label for="message" class="text-main01">留言（選填）</label>
                  <textarea
                    id="message"
                    placeholder="如有配送或其他需求，請在此留言"
                    class="form-control form-control-sm"
                    rows="6"
                    v-model="contactForm.message"
                  >
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
                        <div class="text-center" style="width: 25px">
                          x{{ item.qty }}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <hr />
                <div class="mb-5">
                  <div class="d-flex justify-content-between mb-2">
                    <span>小計</span>
                    <span v-if="carts.total"
                      >NT{{ carts.total | currency }}</span
                    >
                  </div>
                  <div
                    v-if="carts.final_total !== carts.total"
                    class="d-flex justify-content-between mb-2 text-main05"
                  >
                    <span>折扣</span>
                    <span
                      >NT{{
                        (carts.total - carts.final_total) | currency
                      }}</span
                    >
                  </div>
                  <div class="d-flex justify-content-between mb-2">
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
                @click="checkout(false)"
              >
                回購物車
              </button>
            </div>
            <div class="col-md-3 offset-md-6">
              <div class="text-right">
                <button
                  type="button"
                  class="btn btn-lg btn-main01 btn-block mb-4"
                  @click="createOrder"
                  :disabled="isSubmitting"
                >
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
import { mapGetters, mapActions } from "vuex";

export default {
  data: function () {
    return {
      couponCode: "",
      isUpdatingCart: false,
      contactForm: {
        user: {
          name: {
            first: "",
            last: "",
          },
          email: "",
          tel: "",
          address: "",
        },
        message: "",
      },
      isSubmitting: false,
    };
  },
  methods: {
    async updateQuantity(item, change) {
      const qty = item.qty + change;
      if (this.isUpdatingCart || qty < 1) {
        return;
      }
      this.isUpdatingCart = true;
      try {
        const res = await this.$store.dispatch("frontend/updateCart", {
          id: item.id,
          productId: item.product.id,
          qty,
        });
        if (!res.data.success) {
          this.$bus.$emit("message:push", res.data.message, "danger");
        }
      } catch (error) {
        this.$bus.$emit(
          "message:push",
          "更新購物車數量失敗，請稍後再試",
          "danger"
        );
      } finally {
        this.isUpdatingCart = false;
      }
    },
    async removeCart(id) {
      try {
        const res = await this.$store.dispatch("frontend/removeCart", { id });
        if (res.data.success) {
          this.$bus.$emit("message:push", res.data.message, "success");
          this.getCarts();
        } else {
          this.$bus.$emit("message:push", res.data.message, "danger");
        }
      } catch (error) {
        this.$bus.$emit("message:push", "刪除購物車失敗", "danger");
      }
    },
    async addCouponCode() {
      try {
        const res = await this.$store.dispatch(
          "frontend/addCouponCode",
          this.couponCode
        );
        if (res.data.success) {
          this.$bus.$emit("message:push", res.data.message, "success");
          this.getCarts();
        } else {
          this.$bus.$emit("message:push", res.data.message, "danger");
        }
      } catch (error) {
        this.$bus.$emit("message:push", "套用優惠券失敗", "danger");
      }
    },
    async createOrder() {
      if (this.isSubmitting) {
        return;
      }
      this.isSubmitting = true;
      try {
        const valid = await this.$validator.validate();
        if (!valid) {
          return;
        }
        const res = await this.$store.dispatch("frontend/createOrder", {
          data: {
            user: {
              name:
                this.contactForm.user.name.first +
                this.contactForm.user.name.last,
              email: this.contactForm.user.email,
              tel: this.contactForm.user.tel,
              address: this.contactForm.user.address,
            },
            message: this.contactForm.message,
          },
        });
        if (res.data.success) {
          this.$bus.$emit("message:push", res.data.message, "success");
          this.$router.push(`checkout/${res.data.orderId}`);
        } else {
          this.$bus.$emit("message:push", res.data.message, "danger");
        }
      } catch (error) {
        this.$bus.$emit("message:push", "建立訂單失敗", "danger");
      } finally {
        this.isSubmitting = false;
      }
    },
    checkout(boolean) {
      this.$store.dispatch("frontend/checkout", boolean);
    },
    ...mapActions("frontend", ["getCarts"]),
  },
  computed: {
    ...mapGetters("frontend", ["carts", "isContact"]),
  },
  created() {
    this.getCarts();
  },
};
</script>
