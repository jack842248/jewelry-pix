<template>
    <div id="confirmModal" class="modal">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">刪除{{ tempData.title }}</h5>
                <button type="button" class="close" data-dismiss="modal" autofocus>
                    <span>&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p>確認是否要刪除{{ tempData.title }}嗎？</p>
            </div>
            <div class="modal-footer">
                <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal">關閉
                </button>
                <button
                    type="button"
                    class="btn btn-danger"
                    @click="confirmDelete">確認
                </button>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    props:['tempData'],
    methods:{
        confirmDelete: function(){
            this.$emit('remove');
        }
    }
}
</script>