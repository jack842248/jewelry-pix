<template>
    <div>
        <!-- 標題 -->
        <div class="d-flex justify-content-between py-3">
            <h2 class="h4">優惠券管理列表</h2>
            <button
                type="button"
                class="btn btn-sm btn-main05"
                data-toggle="modal"
                data-target="#couponModal"
                @click="openModal(true)">
                <i class="fas fa-plus mr-1"></i>建立新的優惠券
            </button>
        </div>
        <!-- 列表 -->
        <div class="table-responsive">
            <table class="table table-sm table-striped table-backend">
                <thead>
                    <tr>
                        <th class="text-center">名稱</th>
                        <th class="text-center">折扣百分比</th>
                        <th class="text-center">到期日</th>
                        <th class="text-center">是否啟用</th>
                        <th class="text-center">編輯</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in coupons" :key="item.id">
                        <td class="text-center">{{ item.title }}</td>
                        <td class="text-center">{{ item.percent }}%</td>
                        <td class="text-center">{{ new Date(item.due_date * 1000).toISOString().split('T')[0] }}</td>
                        <td class="text-center">
                            <span v-if="item.is_enabled == 1" class="text-success">啟用</span>
                            <span v-else class="text-danger">未啟用</span>
                        </td>
                        <td class="text-center">
                            <button
                                type="button"
                                class="btn btn-sm text-main01"
                                @click="openModal(false,item)">
                                <i class="fas fa-pencil-alt"></i>
                            </button>
                            <button
                                type="button"
                                class="btn btn-sm text-danger"
                                @click="openConfirmModal(item)">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- 分頁 -->
        <Pagination @page="getCoupons"></Pagination>
        <!-- 商品彈窗 -->
        <div
            class="modal fade"
            id="couponModal">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <template v-if="isNew">新增優惠券</template>
                            <template v-else>編輯優惠券</template>
                        </h5>
                        <button
                            type="button"
                            class="close"
                            data-dismiss="modal">
                            <span>&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label
                                for="title"
                                class="sr-only">標題</label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                class="form-control form-control-sm"
                                :class="{'is-invalid': errors.has('title') }"
                                v-validate="'required'"
                                v-model="tempCoupon.title"
                                placeholder="請輸入標題"/>
                            <span
                                v-if="errors.has('title')"
                                class="small text-danger">此欄位為必填
                            </span>
                        </div>
                        <div class="form-group">
                            <label
                                for="code"
                                class="sr-only">優惠碼
                            </label>
                            <input
                                id="code"
                                name="code"
                                type="text"
                                class="form-control form-control-sm"
                                :class="{'is-invalid': errors.has('code') }"
                                v-validate="'required'"
                                v-model="tempCoupon.code"
                                placeholder="請輸入優惠碼"/>
                            <span
                                v-if="errors.has('code')"
                                class="small text-danger">此欄位為必填
                            </span>
                        </div>
                        <div class="form-group">
                            <label
                                for="expires_at"
                                class="sr-only">到期日
                            </label>
                            <input
                                id="expires_at"
                                name="expires_at"
                                type="date"
                                class="form-control form-control-sm"
                                :class="{'is-invalid': errors.has('expires_at') }"
                                v-validate="'required'"
                                v-model="tempCoupon.due_date"
                                placeholder="請輸入到期日"/>
                                <span
                                    v-if="errors.has('expires_at')"
                                    class="small text-danger">此欄位為必填
                                </span>
                        </div>
                        <div class="form-group">
                            <label
                                for="percent"
                                class="sr-only">折扣百分比
                            </label>
                            <input
                                id="percent"
                                name="percent"
                                type="text"
                                class="form-control form-control-sm"
                                :class="{'is-invalid': errors.has('percent') }"
                                v-validate="'required'"
                                v-model.number="tempCoupon.percent"
                                placeholder="請輸入折扣百分比"/>
                            <span
                                v-if="errors.has('percent')"
                                class="small text-danger">此欄位為必填
                            </span>
                        </div>
                        <div class="form-check">
                            <input
                                type="checkbox"
                                class="form-check-input"
                                id="is_enabled"
                                :true-value="1"
                                :false-value="0"
                                v-model="tempCoupon.is_enabled"/>
                            <label
                                for="is_enabled"
                                class="form-check-label small mt-1">是否啟用
                            </label>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-dismiss="modal"
                        >關閉
                        </button>
                        <button
                            type="button"
                            class="btn btn-main01"
                            @click="updateCoupon">
                            <template v-if="isNew">新增優惠券</template>
                            <template v-else>更新優惠券</template>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 確認刪除彈窗 -->
        <ConfirmModal :tempData="tempCoupon" @remove="removeCoupon"></ConfirmModal>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Pagination from '@/components/backend/Pagination.vue';
import ConfirmModal from '@/components/backend/ConfirmModal.vue';

export default {
    components:{
        Pagination,
        ConfirmModal
    },
    data: function () {
        return {
            isNew: true,
            tempCoupon: {},
        };
    },
    methods: {
        openModal(isNew,item){
            if(isNew){
                this.tempCoupon = {
                    is_enabled: 0
                };
                this.isNew = true;
            }else{
                this.tempCoupon = {
                    ...item,
                    due_date: new Date(item.due_date * 1000).toISOString().split('T')[0]
                };
                this.isNew = false;
            }
            $("#couponModal").modal("show");
        },
        openConfirmModal: function(item){
            this.tempCoupon = { ...item };
            $("#confirmModal").modal("show");
        },
        getCoupons(page = 1) {
            this.$store.dispatch('backend/getCoupons', page);
        },
        async updateCoupon(){
            const valid = await this.$validator.validate();
            if(!valid){
                return;
            }else{
                try {
                    const res = await this.$store.dispatch('backend/updateCoupon', {
                        isNew: this.isNew,
                        tempCoupon: {
                            id: this.tempCoupon.id,
                            title: this.tempCoupon.title,
                            is_enabled: this.tempCoupon.is_enabled,
                            percent: this.tempCoupon.percent,
                            due_date: Math.floor(new Date(this.tempCoupon.due_date).getTime() / 1000),
                            code: this.tempCoupon.code
                        }
                    });
                    if(res.data.success){
                        this.$bus.$emit('message:push',res.data.message,'success');
                        this.getCoupons();
                    }else{
                        this.$bus.$emit('message:push',res.data.message,'danger');
                    }
                } catch (error) {
                    console.error('更新失敗',error);
                } finally{
                    $('#couponModal').modal('hide');
                }
            }
        },
        async removeCoupon(){
            try {
                const res = await this.$store.dispatch('backend/removeCoupon',this.tempCoupon.id);
                if(res.data.success){
                    this.$bus.$emit('message:push',res.data.message,'success');
                    this.getCoupons();
                }else{
                    this.$bus.$emit('message:push',res.data.message,'danger');
                }
            } catch (error) {
                console.error('刪除失敗',error);
            } finally {
                $('#confirmModal').modal('hide');
            }

        }
    },
    computed:{
        ...mapGetters('backend',['coupons'])
    },
    created() {
        this.getCoupons();
    }
};
</script>