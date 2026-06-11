<template>
    <div class="h-100">
        <loading
            :active.sync="isLoading"
            transition="fade"
            loader="dots">
        </loading>
        <AlertMessage></AlertMessage>
        <router-view></router-view>
    </div>
</template>

<script>
import AlertMessage from "@/components/AlertMessage.vue";

export default {
    components: {
        AlertMessage,
    },
    computed:{
        isLoading: function(){
            return this.$store.state.isLoading
        }
    }
};
</script>

<style lang="scss">
@import "./assets/all.scss";
</style>
