<template>
  <div class="h-100">
    <Loading :active="isLoading" transition="fade" loader="dots" />
    <AlertMessage />
    <router-view />
  </div>
</template>

<script>
import AlertMessage from "@/components/common/AlertMessage.vue";

export default {
  components: {
    AlertMessage,
  },
  computed: {
    isLoading: function () {
      return this.$store.getters.isLoading;
    },
  },
};
</script>

<style lang="scss">
@import "./assets/all.scss";
</style>
