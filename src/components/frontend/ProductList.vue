<template>
  <div class="row gap-4">
    <div v-for="item in products" :key="item.id" class="col-6 col-md-3">
      <div class="card">
        <button
          type="button"
          class="card-img-top border-0 p-0"
          @click="openProductDetail(item)"
        >
          <img class="img-fluid" :src="item.imageUrl" :alt="item.title" />
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
            @click="addToCart(item.id)"
          >
            加入購物車
          </button>
        </div>
      </div>
    </div>
    <ProductDetailModal
      :visible="isModalOpen"
      :temp-product="tempProduct"
      @close="closeModal"
    />
  </div>
</template>

<script>
import ProductDetailModal from "./ProductDetailModal.vue";

export default {
  props: ["products"],
  components: {
    ProductDetailModal,
  },
  data() {
    return {
      isModalOpen: false,
      tempProduct: {},
    };
  },
  methods: {
    async addToCart(id, qty = 1) {
      try {
        const res = await this.$store.dispatch("frontend/addToCart", {
          id,
          qty,
        });
        if (res.data.success) {
          this.$store.dispatch("frontend/getCarts");
          this.$bus.$emit("message:push", res.data.message, "success");
        } else {
          this.$bus.$emit("message:push", res.data.message, "danger");
        }
      } catch (error) {
        this.$bus.$emit("message:push", "加入購物車失敗", "danger");
      }
    },
    async openProductDetail(item) {
      try {
        const res = await this.$store.dispatch(
          "frontend/openProductDetail",
          item.id
        );
        if (res.data.success) {
          this.isModalOpen = true;
          this.tempProduct = res.data.product;
        } else {
          this.$bus.$emit("message:push", res.data.message, "danger");
        }
      } catch (error) {
        this.$bus.$emit("message:push", "查看商品資訊失敗", "danger");
      }
    },
    closeModal() {
      this.isModalOpen = false;
    },
  },
};
</script>
