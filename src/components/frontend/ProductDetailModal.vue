<template>
  <div v-if="visible">
    <div
      class="modal fade show d-block"
      tabindex="-1"
      role="dialog"
      aria-modal="true"
      @click.self="closeModal"
    >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header border-bottom-0">
            <h5 class="modal-title">{{ tempProduct.title }}</h5>
            <button type="button" class="close" @click="closeModal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img
              :src="tempProduct.imageUrl"
              class="img-fluid mb-3"
              :alt="tempProduct.title"
            />
            <div
              class="d-flex justify-content-between align-items-baseline mb-2"
            >
              <del class="h6" v-if="tempProduct.price"
                >NT{{ tempProduct.origin_price | currency }}</del
              >
              <div class="h5 text-main05" v-if="tempProduct.price">
                NT{{ tempProduct.price | currency }}
              </div>
            </div>
            <blockquote class="blockquote mb-4">
              <p class="text-main01 mb-1" style="white-space: pre-line">
                {{ tempProduct.description }}
              </p>
              <footer class="blockquote-footer">
                {{ tempProduct.content }}
              </footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center">
                <button
                  type="button"
                  class="img-sm border-0 bg-gray-200 rounded"
                  @click="updateQuantity(false)"
                >
                  <i
                    style="transform: translateY(-1px)"
                    class="fas fa-minus fa-xs"
                  ></i>
                </button>
                <div
                  style="width: 100px; height: 30px; line-height: 2"
                  class="text-center bg-gray-100"
                >
                  {{ num }}
                </div>
                <button
                  type="button"
                  class="img-sm border-0 bg-gray-200 rounded"
                  @click="updateQuantity(true)"
                >
                  <i
                    style="transform: translateY(-1px)"
                    class="fas fa-plus fa-xs"
                  ></i>
                </button>
              </div>
              <div class="text-nowrap">
                小計
                <strong>{{ (num * tempProduct.price) | currency }}</strong
                >元
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-main01 flex-grow-1"
              :disabled="num == 0"
              @click="addToCart(tempProduct.id)"
            >
              加入購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show" @click="closeModal"></div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    tempProduct: {
      type: Object,
      default: () => ({}),
    },
  },
  data: function () {
    return {
      num: 0,
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    updateQuantity(boolean) {
      if (boolean) {
        this.num += 1;
      } else {
        if (this.num == 0) {
          return;
        }
        this.num -= 1;
      }
    },
    async addToCart(id) {
      try {
        const res = await this.$store.dispatch("frontend/addToCart", {
          id,
          qty: this.num,
        });
        if (res.data.success) {
          this.$store.dispatch("frontend/getCarts");
          this.$bus.$emit("message:push", res.data.message, "success");
        } else {
          this.$bus.$emit("message:push", res.data.message, "danger");
        }
      } catch (error) {
        this.$bus.$emit("message:push", "加入購物車失敗", "danger");
      } finally {
        this.$emit("close");
      }
    },
  },
  watch: {
    tempProduct() {
      this.num = 0;
    },
  },
};
</script>
