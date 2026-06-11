<template>
    <div>
        <!-- 標題 -->
        <div class="d-flex justify-content-between py-3">
            <h2 class="h4">商品管理列表</h2>
            <button
                type="button"
                class="btn btn-sm btn-main05"
                data-toggle="modal"
                data-target="#productModal"
                @click="openModal(true)">
                <i class="fas fa-plus mr-1"></i>建立新的商品
            </button>
        </div>
        <!-- 列表 -->
        <div class="table-responsive">
            <table class="table table-sm table-striped table-backend">
                <thead>
                    <tr>
                        <th class="text-center">分類</th>
                        <th class="text-center">產品名稱</th>
                        <th class="text-center">原價</th>
                        <th class="text-center">售價</th>
                        <th class="text-center">是否啟用</th>
                        <th class="text-center">編輯</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in products" :key="item.id">
                        <td class="text-center">{{ item.category }}</td>
                        <td class="text-center">{{ item.title }}</td>
                        <td class="text-center"><del>{{ item.origin_price | currency }}</del></td>
                        <td class="text-center">{{ item.price | currency }}</td>
                        <td class="text-center">
                            <span v-if="item.is_enabled == 1" class="text-success">啟用</span>
                            <span v-else class="text-danger">未啟用</span>
                        </td>
                        <td class="text-center">
                            <div class="btn-group">
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
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- 分頁 -->
        <Pagination @page="getProducts"></Pagination>
        <!-- 編輯商品彈窗 -->
        <div
            class="modal fade"
            id="productModal">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <template v-if="isNew">新增商品</template>
                            <template v-else>編輯商品</template>
                        </h5>
                        <button
                            type="button"
                            class="close"
                            data-dismiss="modal">
                            <span>&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label
                                        for="image"
                                        class="sr-only">輸入圖片網址
                                    </label>
                                    <input
                                        type="text"
                                        class="form-control form-control-sm"
                                        id="image"
                                        v-model="tempProduct.imageUrl"
                                        placeholder="請輸入圖片連結"/>
                                </div>
                                <div class="form-group">
                                    <div class="custom-file custom-file-sm">
                                        <input
                                            id="customFile"
                                            type="file"
                                            class="custom-file-input"
                                            @change="updateImage"
                                            ref="files">
                                        <label
                                            for="customFile"
                                            class="custom-file-label small"
                                            >
                                            <i v-if="status.updateImage" class="fas fa-spinner fa-spin"></i>
                                            <template v-else>...</template>
                                        </label>
                                    </div>
                                </div>
                                <img
                                    class="img-fluid"
                                    :src="tempProduct.imageUrl"
                                    alt=""
                                />
                            </div>
                            <div class="col-sm-8">
                                <div class="form-group">
                                    <label
                                        for="title"
                                        class="sr-only">標題
                                    </label>
                                    <input
                                        id="title"
                                        name="title"
                                        type="text"
                                        class="form-control form-control-sm"
                                        :class="{'is-invalid': errors.has('title') }"
                                        v-validate="'required'"
                                        v-model="tempProduct.title"
                                        placeholder="請輸入標題"/>
                                    <span
                                        v-if="errors.has('title')"
                                        class="small text-danger">此欄位為必填
                                    </span>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label
                                            for="category"
                                            class="sr-only">分類
                                        </label>
                                        <input
                                            id="category"
                                            name="category"
                                            type="text"
                                            class="form-control form-control-sm"
                                            :class="{'is-invalid': errors.has('category') }"
                                            v-validate="'required'"
                                            v-model="tempProduct.category"
                                            placeholder="請輸入分類"/>
                                        <span
                                            v-if="errors.has('category')"
                                            class="small text-danger">此欄位為必填
                                        </span>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label
                                            for="unit"
                                            class="sr-only">單位
                                        </label>
                                        <input
                                            id="unit"
                                            name="unit"
                                            type="unit"
                                            class="form-control form-control-sm"
                                            :class="{'is-invalid': errors.has('unit') }"
                                            v-validate="'required'"
                                            v-model="tempProduct.unit"
                                            placeholder="請輸入單位"/>
                                        <span
                                            v-if="errors.has('unit')"
                                            class="small text-danger">此欄位為必填
                                        </span>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label
                                            for="origin_price"
                                            class="sr-only">原價
                                        </label>
                                        <input
                                            id="origin_price"
                                            name="origin_price"
                                            type="number"
                                            class="form-control form-control-sm"
                                            :class="{'is-invalid': errors.has('origin_price') }"
                                            v-validate="'required'"
                                            v-model.number="tempProduct.origin_price"
                                            placeholder="請輸入原價"/>
                                        <span
                                            v-if="errors.has('origin_price')"
                                            class="small text-danger">此欄位為必填
                                        </span>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label
                                            for="price"
                                            class="sr-only">售價
                                        </label>
                                        <input
                                            id="price"
                                            name="price"
                                            type="number"
                                            class="form-control form-control-sm"
                                            :class="{'is-invalid': errors.has('price') }"
                                            v-validate="'required'"
                                            v-model.number="tempProduct.price"
                                            placeholder="請輸入售價"/>
                                        <span
                                            v-if="errors.has('price')"
                                            class="small text-danger">此欄位為必填
                                        </span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label
                                        for="description"
                                        class="sr-only">產品描述
                                    </label>
                                    <textarea
                                        type="text"
                                        class="form-control form-control-sm"
                                        id="description"
                                        v-model="tempProduct.description"
                                        placeholder="請輸入產品描述">
                                    </textarea>
                                </div>
                                <div class="form-group">
                                    <label
                                        for="content"
                                        class="sr-only">說明內容
                                    </label>
                                    <textarea
                                        type="text"
                                        class="form-control form-control-sm"
                                        id="content"
                                        v-model="tempProduct.content"
                                        placeholder="請輸入產品說明內容">
                                    </textarea>
                                </div>
                                <div class="form-group">
                                    <div class="form-check">
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            v-model="tempProduct.is_enabled"
                                            :true-value="1"
                                            :false-value="0"
                                            id="is_enabled"/>
                                        <label
                                            for="is_enabled"
                                            class="form-check-label small mt-1">
                                            是否啟用
                                        </label>
                                    </div>
                                </div>
                            </div>
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
                            @click="updateProduct">
                            <template v-if="isNew">新增商品</template>
                            <template v-else>更新商品</template>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 確認刪除彈窗 -->
        <ConfirmModal :tempData="tempProduct" @remove="removeProduct"></ConfirmModal>
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
            tempProduct: {},
            status:{
                updateImage: false
            }
        };
    },
    methods: {
        openModal: function (isNew,item) {
            if(isNew){
                this.tempProduct = {};
                this.isNew = true;
            }else{
                this.tempProduct = {
                    ...item,
                };
                this.isNew = false;
            }
            $("#productModal").modal("show");
        },
        openConfirmModal: function(item){
            this.tempProduct = {...item};
            $("#confirmModal").modal("show");
        },
        getProducts(page = 1) {
            this.$store.dispatch('backend/getProducts', page)
        },
        async updateProduct(){
            const valid = await this.$validator.validate();
            if(!valid){
                return
            }else{
                try {
                    const res = await this.$store.dispatch('backend/updateProduct', {
                        isNew: this.isNew,
                        tempProduct: this.tempProduct
                    })
                    if(res.data.success){
                        this.$bus.$emit('message:push',res.data.message,'success');
                        this.getProducts();
                    }else{
                        this.$bus.$emit('message:push',res.data.message,'danger');
                    }
                } catch (error) {
                    console.error('更新失敗', error);
                } finally {
                    $('#productModal').modal('hide');
                }
            }
        },
        async removeProduct(){
            try {
                const res = await this.$store.dispatch('backend/removeProduct',this.tempProduct.id);
                if(res.data.success){
                    this.$bus.$emit('message:push',res.data.message,'success');
                    this.getProducts();
                }else{
                    this.$bus.$emit('message:push',res.data.message,'danger');
                }
            } catch (error) {
                console.error('刪除失敗', error);
            } finally {
                $('#confirmModal').modal('hide');
            }
        },
        async updateImage(){
            this.status.updateImage = true;
            const uploadedFile = this.$refs.files.files[0];
            const formData = new FormData();
            formData.append('file-to-upload',uploadedFile)
            try {
                const res = await this.$store.dispatch('backend/updateImage',formData);
                if(res.data.success){
                    this.$set(this.tempProduct,'imageUrl',res.data.imageUrl)
                    this.$bus.$emit('message:push','圖片上傳成功','success');
                }else{
                    this.$bus.$emit('message:push',res.data.message,'danger');
                }
            } catch (error) {
                console.error('圖片上傳失敗', error);
            } finally {
                this.status.updateImage = false;
            }
        }
    },
    computed:{
        ...mapGetters('backend',['products'])
    },
    created() {
        this.getProducts();
    }
};
</script>