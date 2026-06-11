<template>
    <nav class="mt-3">
        <ul class="pagination justify-content-center">
            <li
                class="page-item"
                :class="{ 'disabled': !pagination.has_pre }">
                <a
                    class="page-link"
                    @click.prevent="emitPage(pagination.current_page - 1)">
                    <span>&laquo;</span>
                </a>
            </li>
            <li
                class="page-item"
                :class="{ 'active': item == pagination.current_page }"
                v-for="item in pagination.total_pages"
                :key="item">
                <a
                    class="page-link"
                    @click.prevent="emitPage(item)">{{ item }}
                </a>
            </li>
            <li
                class="page-item"
                :class="{ 'disabled': !pagination.has_next }">
                <a
                    class="page-link"
                    @click.prevent="emitPage(pagination.current_page + 1)">
                    <span>&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default{
    methods:{
        emitPage(page){
            this.$emit('page',page)
        }
    },
    computed:{
        ...mapGetters('backend',['pagination'])
    }
}
</script>