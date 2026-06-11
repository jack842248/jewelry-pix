<template>
    <div class="message-alert">
        <div
            class="alert alert-dismissible"
            :class="'alert-'+item.status"
            v-for="(item,i) in messages" :key="i">
            {{ item.message }}
            <button type="button" class="close" @click="removeMessage(i)">
                <span>&times;</span>
            </button>
        </div>
    </div>
</template>

<script>
export default{
    name: 'Navbar',
    data: function(){
        return{
            messages: []
        }
    },
    methods:{
        updateMessage: function(message, status){
            const timestamp = Math.floor(new Date() / 1000);
            this.messages.push({
                message,
                status,
                timestamp
            })
            this.removeMessageWithTiming(timestamp);
        },
        removeMessage: function(num){
            this.messages.splice(num, 1);
        },
        removeMessageWithTiming: function(timestamp){
            setTimeout(() => {
                this.messages.forEach((item, i) => {
                    if (item.timestamp === timestamp) {
                        this.messages.splice(i, 1);
                    }
                });
            }, 3000);
        }
    },
    created(){
        this.$bus.$on('message:push',(message, status = 'warning')=>{
            this.updateMessage(message, status);
        })
    }
}
</script>