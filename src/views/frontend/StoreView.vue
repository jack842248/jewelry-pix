<template>
  <div style="margin-top: 90px">
    <section
      class="category-hero"
      :style="{
        backgroundImage: `url(${require('@/assets/images/img-store.jpg')})`,
      }"
    >
      <div class="container h-100">
        <div class="row flex-column justify-content-end h-100">
          <div class="text-right">
            <h2 class="pr-3">商店</h2>
            <slot name="breadcrumb" />
          </div>
        </div>
      </div>
    </section>
    <section class="mb-5">
      <div class="container">
        <div class="pt-5 pb-4">
          <div class="d-flex justify-content-between align-items-center">
            <p class="text-main01 mb-0">顯示結果，共{{ products.length }}項</p>
            <select class="custom-select custom-select-sm" v-model="sortBy">
              <option value="price-asc">依價格排序低至高</option>
              <option value="price-desc">依價格排序高至低</option>
            </select>
          </div>
        </div>
        <ProductList :products="sortPrice" />
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ProductList from "@/components/frontend/ProductList.vue";

export default {
  components: {
    ProductList,
  },
  data: function () {
    return {
      sortBy: "price-asc",
    };
  },
  methods: {
    ...mapActions("frontend", ["getProducts"]),
  },
  computed: {
    sortPrice: function () {
      return [...this.products].sort((a, b) => {
        if (this.sortBy == "price-asc") {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });
    },
    ...mapGetters("frontend", ["products"]),
  },
  created() {
    this.getProducts();
  },
};
</script>
