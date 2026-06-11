<template>
    <div>
        <!-- 標題 -->
        <div class="d-flex justify-content-between py-3">
            <h2 class="h4">訂單管理列表</h2>
        </div>
        <!-- 列表 -->
        <div class="table-responsive">
            <table class="table table-sm table-striped table-backend">
                <thead>
                    <tr>
                        <th class="text-center">購買時間</th>
                        <th class="text-center">Email</th>
                        <th class="text-left">購買款項</th>
                        <th class="text-center">應付金額</th>
                        <th class="text-center">狀態</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in orders" :key="item.id">
                        <td class="text-center">{{ new Date(item.create_at * 1000).toISOString().split('T')[0] }}</td>
                        <td class="text-center">{{ item.user.email }}</td>
                        <td class="text-left">
                            <p class="mb-0" v-for="i in item.products" :key="i.id">
                                {{ i.product.title }} 數量：{{ i.qty }}{{ i.product.unit }}
                            </p>
                        </td>
                        <td class="text-center">{{ item.total | currency }}</td>
                        <td class="text-center">
                            <span v-if="item.is_paid" class="text-success">已付款</span>
                            <span v-else class="text-danger">尚未付款</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- 分頁 -->
        <Pagination @page="getOrders"></Pagination>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Pagination from '@/components/backend/Pagination.vue';

export default {
    components:{
        Pagination
    },
    methods: {
        getOrders(page = 1) {
            this.$store.dispatch('backend/getOrders', page);
        },
    },
    computed:{
        ...mapGetters('backend',['orders'])
    },
    created() {
        this.getOrders();
    }
};
</script>