<template>
    <div style="margin-top:90px">
        <section class="py-8">
            <div class="container">
                <div class="row">
                    <div class="col-8 offset-2 col-md-6 offset-md-3 col-xl-4 offset-xl-4">
                        <div class="text-center">
                            <img
                                class="img-lg mb-3"
                                src="/static/images/logo-circle.png"
                                alt="">
                        </div>
                        <ul class="nav nav-tabs mb-4">
                            <li class="nav-item flex-grow-1">
                                <a class="text-center nav-link active">管理員者身份</a>
                            </li>
                            <li class="nav-item flex-grow-1">
                                <a class="text-center nav-link">一般會員身份</a>
                            </li>
                        </ul>
                        <form class="form-signin" @keyup.enter.prevent="signin">
                            <div class="form-group mb-4">
                                <label
                                    for="inputEmail"
                                    class="sr-only">Email
                                </label>
                                <input
                                    type="email"
                                    id="inputEmail"
                                    class="form-control"
                                    autocomplete="username"
                                    placeholder="Email Address"
                                    required
                                    autofocus
                                    v-model="user.username"
                                />
                            </div>
                            <div class="from-group mb-4">
                                <label for="inputPassword" class="sr-only">Password</label>
                                <input
                                    type="password"
                                    id="inputPassword"
                                    class="form-control"
                                    autocomplete="current-password"
                                    placeholder="Password"
                                    required
                                    v-model="user.password"
                                />
                            </div>
                            <button
                                class="btn btn-lg btn-main01 btn-block"
                                type="button"
                                @click="signin">
                                登入
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            user: {
                username: "",
                password: "",
            },
        };
    },
    methods: {
        async signin() {
            try {
                const res = await this.$store.dispatch('frontend/signin',this.user);
                if(res.data.success){
                    document.cookie = `hexToken=${res.data.token}; expires=${new Date(res.data.expired)}; path=/`;
                    this.$bus.$emit('message:push',res.data.message,'success');
                    this.$router.push('/admin/products')
                }else{
                    this.$bus.$emit('message:push',res.data.message,'danger');
                    this.$router.push('/login')
                }
            } catch (error) {
                console.error('登入失敗',error)
            }
        },
    }
};
</script>