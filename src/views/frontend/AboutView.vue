<template>
    <div style="margin-top:90px">
        <section
            class="category-hero"
            style="background-image: url('/static/images/img-about-bg.jpg');">
            <div class="container h-100">
                <div class="row flex-column justify-content-end h-100">
                    <div class="text-right">
                        <h2 class="pr-3">關於我們</h2>
                        <slot name="breadcrumb"></slot>
                    </div>
                </div>
            </div>
        </section>
        <section class="py-5">
            <div class="container">
                <div class="row">
                    <div class="col-md-6 d-flex flex-column justify-content-center order-1 order-md-1">
                        <div class="text-center text-md-left p-5 p-md-0">
                            <small class="d-block text-main01 mb-2">關於豬寶盒About Jewelry Pix</small>
                            <h2 class="h4 mb-3">小資女孩的選購天堂</h2>
                            <p class="text-main01">
                                「豬寶盒 Jewelry Pix」希望讓每個喜歡打扮的女孩，都能輕鬆擁有精緻日常。
                                <br>我們相信變美不該是負擔，而是隨時都能實現的選擇。
                            </p>
                            <p class="text-main01">
                                從眾多商品中嚴選高 CP 值與設計感飾品，並從海外引進，
                                <br>讓妳用剛剛好的價格，擁有剛剛好的美。
                            </p>
                            <p class="text-main01">這裡不只是購物，而是一場屬於妳的風格探索。</p>
                        </div>
                    </div>
                    <div class="col-md-6 d-flex flex-column justify-content-center order-2 order-md-2">
                        <img class="img-fluid" src="/static/images/img-packaging-card.jpg" alt="">
                    </div>
                    <div class="col-md-6 d-flex flex-column justify-content-center order-4 order-md-3">
                        <img class="img-fluid" src="/static/images/img-zipper-bag.jpg" alt="">
                    </div>
                    <div class="col-md-6 d-flex flex-column justify-content-center order-3 order-md-4">
                        <div class="text-center text-md-left p-5 p-md-0">
                            <small class="d-block text-main01 mb-2">售後服務 After Sale Service</small>
                            <h2 class="h4">平價，也能很有質感</h2>
                            <p class="text-main01">
                                Jewelry Pix 專注於線上經營，省去實體成本，將更多價值回饋在商品本身，
                                讓妳買到的不只是價格，而是值得。
                            </p>
                            <p class="text-main01">
                                從下單、檢查到包裝出貨，我們都細心把關，
                                希望商品在送達時，能讓妳感受到剛剛好的溫度與用心。
                            </p>
                            <router-link
                                to="/store"
                                class="btn btn-sm btn-main01">
                                回商店選購
                            </router-link>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-md-6 d-flex flex-column justify-content-center">
                        <div class="text-left">
                            <small class="d-block text-main01 mb-2">聯絡我們 Contact Us</small>
                            <h3 class="h4">填寫表單聯繫我們</h3>
                            <p class="text-main01 mb-4">不論您是想提供建議或提間，都歡迎您填寫表單
                                <br>我們收到訊息後將會儘速回覆您的問題！
                                <br>另外您也可以透過以下資訊聯繫我們：
                            </p>
                            <ul class="list-unstyled">
                                <li class="d-flex align-items-center mb-4">
                                    <img class="img-md" src="/static/images/icon-contact-mail.png" alt="">
                                    <div class="ml-2">
                                        <h4 class="h6 text-main02">Email Address</h4>
                                        <small class="text-main01">service@jewelry-pix.com</small>
                                    </div>
                                </li>
                                <li class="d-flex align-items-center mb-4">
                                    <img class="img-md" src="/static/images/icon-contact-phone.png" alt="">
                                    <div class="ml-2">
                                        <h4 class="h6 text-main02">Phone Numbers</h4>
                                        <small class="text-main01">0987-654-321</small>
                                    </div>
                                </li>
                                <li class="d-flex align-items-center mb-4">
                                    <img class="img-md" src="/static/images/icon-contact-line.png" alt="">
                                    <div class="ml-2">
                                        <h4 class="h6 text-main02">Line Account</h4>
                                        <small class="text-main01">@111pfeca</small>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-6 d-flex flex-column justify-content-center">
                        <div class="text-left shadow-sm">
                            <form class="p-3" @submit.prevent="sendMessage">
                                <div class="form-group">
                                    <label
                                        for="name"
                                        class="small text-main01">姓名
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        class="form-control"
                                        v-model="user.name"
                                        placeholder="請輸入您的名字"
                                        required>
                                </div>
                                <div class="form-group">
                                    <label
                                        for="email"
                                        class="small text-main01">電子信箱
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        class="form-control"
                                        v-model="user.email"
                                        placeholder="請輸入電子信箱">
                                </div>
                                <div class="form-group">
                                    <label
                                        for="tel"
                                        class="small text-main01">電話聯絡
                                    </label>
                                    <input
                                        id="tel"
                                        type="text"
                                        class="form-control"
                                        v-model="user.tel"
                                        placeholder="請輸入電話號碼">
                                </div>
                                <div class="form-group">
                                    <label
                                        for="message"
                                        class="small text-main01">訊息內容
                                    </label>
                                    <textarea
                                        name="message"
                                        id="message"
                                        class="form-control"
                                        rows="3"
                                        v-model="user.message"
                                        placeholder="請輸入信件內容...">
                                    </textarea>
                                </div>
                                <button
                                    type="submit"
                                    class="btn btn-sm btn-main01 mt-5">
                                    確認送出
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default{
    data: function(){
        return{
            user: {}
        }
    },
    methods:{
        sendMessage(){
            this.user = {
                name: '',
                email: '',
                tel: '',
                message: ''
            }
            this.$bus.$emit('message:push', '送出成功', 'success')
        }
    }
}
</script>