<template>
  <main class="index-texture">
    <!-- 優勢 -->
    <div class="container pb-7" style="margin-top: -5rem">
      <div class="bg-white shadow-sm p-4">
        <ul class="row justify-content-center list-unstyled">
          <li class="col-md-4 text-center">
            <div class="text-main03 p-4">
              <i class="fas fa-thumbs-up fa-2x"></i>
            </div>

            <h2 class="text-main02 h5">精美包裝</h2>
            <p class="text-dark">
              每件飾品都附有高級象牙背卡
              <br />外層加厚PP透明袋保護
            </p>
          </li>
          <li class="col-md-4 text-center">
            <div class="text-main03 p-4">
              <i class="fas fa-shipping-fast fa-2x"></i>
            </div>

            <h2 class="text-main02 h5">快速出貨</h2>
            <p class="text-dark">
              當我們收到訂單後隔日即出貨
              <br />讓您能快速的收到商品
            </p>
          </li>
          <li class="col-md-4 text-center">
            <div class="text-main03 p-4">
              <i class="fas fa-sync-alt fa-2x"></i>
            </div>

            <h2 class="text-main02 h5">只退不換</h2>
            <p class="text-dark">
              若收到商品後有任何疑慮
              <br />在七天內都可直接進行退貨處理
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
            <img
              class="img-fluid"
              :src="require('@/assets/images/img-theme-clip-on-earrings.jpg')"
              alt="耳夾耳環系列"
            />
          </router-link>
        </div>
        <div class="col-md-6">
          <router-link to="/store/crystal-bracelets">
            <img
              class="img-fluid"
              :src="require('@/assets/images/img-theme-crystal-bracelets.jpg')"
              alt="水晶手環"
            />
          </router-link>
        </div>
        <div class="col-md-6">
          <router-link to="/store/christmas-spin">
            <img
              class="img-fluid"
              :src="require('@/assets/images/img-theme-christmas-spin.jpg')"
              alt="聖誕轉轉"
            />
          </router-link>
        </div>
        <div class="col-md-6">
          <router-link to="/store/sterling-silver">
            <img
              class="img-fluid"
              :src="require('@/assets/images/img-theme-sterling-silver.jpg')"
              alt="925銀飾"
            />
          </router-link>
        </div>
      </div>
    </div>
    <!-- 訂閱電子報 -->
    <section
      class="container-fluid index-banner newsletter-section text-center text-white mb-7"
      aria-labelledby="newsletter-title"
    >
      <div class="newsletter-content mx-auto py-5">
        <p class="small newsletter-eyebrow mb-2">JEWELRY PIX LETTER</p>
        <h2 id="newsletter-title" class="h3 mb-3">
          把日常的閃耀，寄進你的信箱
        </h2>
        <p class="newsletter-description mb-4">
          訂閱電子報，接收新品消息、飾品搭配靈感與不定期優惠。
        </p>
        <form @submit.prevent="subscribeNewsletter">
          <label for="newsletter-email" class="sr-only">電子信箱（必填）</label>
          <div class="input-group">
            <input
              id="newsletter-email"
              v-model.trim="newsletterEmail"
              type="email"
              name="newsletterEmail"
              class="form-control"
              placeholder="輸入你的 Email"
              autocomplete="email"
              required
              aria-required="true"
            />
            <div class="input-group-append">
              <button type="submit" class="btn btn-main03 px-3 px-md-4">
                訂閱電子報
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
    <!-- 人氣商品 -->
    <div class="container pb-7">
      <div class="text-center">
        <h3 class="h2 text-main02 mb-4">人氣商品</h3>
      </div>
      <ProductList :products="popularProducts" />
    </div>
  </main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ProductList from "@/components/frontend/ProductList.vue";

export default {
  components: {
    ProductList,
  },
  data() {
    return {
      newsletterEmail: "",
    };
  },
  methods: {
    subscribeNewsletter() {
      this.newsletterEmail = "";
      this.$bus.$emit("message:push", "電子報訂閱成功", "success");
    },
    ...mapActions("frontend", ["getProducts"]),
  },
  computed: {
    ...mapGetters("frontend", ["products"]),
    popularProducts() {
      return this.products.slice(0, 4);
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style lang="scss" scoped>
.newsletter-section {
  min-height: 300px;
  display: flex;
  align-items: center;
}
.newsletter-content {
  width: 100%;
  max-width: 560px;
}
.newsletter-eyebrow {
  letter-spacing: 0.2em;
  color: #d7c9af;
}
.newsletter-description {
  color: #d2dbe5;
}
</style>
