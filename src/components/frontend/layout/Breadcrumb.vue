<template>
  <nav>
    <ol class="breadcrumb justify-content-end">
      <li v-for="item in breadcrumbs" :key="item.path" class="breadcrumb-item">
        <template v-if="item.isCurrent">
          {{ item.name }}
        </template>

        <router-link v-else :to="item.path" class="text-main01">
          {{ item.name }}
        </router-link>
      </li>
    </ol>
  </nav>
</template>

<script>
import { categories } from "@/config/categories";

export default {
  computed: {
    currentCategory() {
      return categories.find((item) => item.slug === this.$route.params.slug);
    },
    breadcrumbs() {
      const matched = this.$route.matched.filter(
        (route) => route.meta.breadcrumb
      );

      if (this.$route.path === "/store") {
        matched.pop();
      }

      return matched.map((route, index) => ({
        name:
          route.name === "商品分類"
            ? this.currentCategory.title
            : route.meta.title,

        path:
          route.name === "商品分類"
            ? this.$route.path
            : route.path === ""
            ? "/"
            : route.path,

        isCurrent: index === matched.length - 1,
      }));
    },
  },
};
</script>
