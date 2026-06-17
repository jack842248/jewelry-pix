import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'hash',
    linkActiveClass: 'active',
    routes: [
        {
            path: '',
            component: ()=> import('@/layouts/FrontendLayout.vue'),
            meta:{
                title: '首頁',
                breadcrumb: true
            },
            children: [
                {
                    path: '/',
                    component: () => import('@/views/frontend/HomeView.vue'),
                    meta: {
                        title: '首頁',
                        breadcrumb: true
                    }
                },
                {
                    name: '關於我們',
                    path: 'about',
                    component: () => import('@/views/frontend/AboutView.vue'),
                    meta: {
                        title: '關於我們',
                        breadcrumb: true
                    }
                },
                {
                    name: '飾品保養',
                    path: 'jewelry-care',
                    component: () => import('@/views/frontend/JewelryCareView.vue'),
                    meta: {
                        title: '飾品保養',
                        breadcrumb: true
                    }
                },
                {
                    name: '購物須知',
                    path: 'shopping-guide',
                    component: () => import('@/views/frontend/ShoppingGuideView.vue'),
                    meta: {
                        title: '購物須知',
                        breadcrumb: true
                    }
                },
                {
                    name: '隱私權條款',
                    path: 'privacy',
                    component: () => import('@/views/frontend/PrivacyView.vue'),
                    meta: {
                        title: '隱私權條款',
                        breadcrumb: true
                    }
                },
                {
                    path: '/store',
                    component: () => import('@/views/frontend/StoreLayout.vue'),
                    meta:{
                        title: '商店',
                        breadcrumb: true
                    },
                    children:[
                        {
                            name: '商店',
                            path: '',
                            component: () => import('@/views/frontend/StoreView.vue'),
                            meta: {
                                title: '商店',
                                breadcrumb: true
                            }
                        },
                        {
                            name: '耳環',
                            path: 'earrings',
                            component: ()=> import('@/views/frontend/EarringsView.vue'),
                            meta: {
                                title: '耳環',
                                breadcrumb: true
                            }
                        },
                        {
                            name: '戒指',
                            path: 'rings',
                            component: ()=> import('@/views/frontend/RingsView.vue'),
                            meta: {
                                title: '戒指',
                                breadcrumb: true
                            }
                        },
                        {
                            name: '項鍊',
                            path: 'necklace',
                            component: ()=> import('@/views/frontend/NecklaceView.vue'),
                            meta: {
                                title: '項鍊',
                                breadcrumb: true
                            }
                        },
                        {
                            name: '手鍊',
                            path: 'bracelet',
                            component: ()=> import('@/views/frontend/BraceletView.vue'),
                            meta: {
                                title: '手鍊',
                                breadcrumb: true
                            }
                        },
                        {
                            name: '耳夾耳環系列',
                            path: 'clip-on-earrings',
                            component: ()=> import('@/views/frontend/ClipOnEarringsView.vue'),
                            meta: {
                                title: '耳夾耳環系列',
                                breadcrumb: true
                            }
                        },
                        {
                            name: '水晶手環',
                            path: 'crystal-bracelets',
                            component: ()=> import('@/views/frontend/CrystalBraceletsView.vue'),
                            meta: {
                                title: '水晶手環',
                                breadcrumb: true
                            }
                        },
                        {
                            name: '聖誕轉轉',
                            path: 'christmas-spin',
                            component: ()=> import('@/views/frontend/ChristmasSpinView.vue'),
                            meta: {
                                title: '聖誕轉轉',
                                breadcrumb: true
                            }
                        },
                        {
                            name: '925銀飾',
                            path: 'sterling-silver',
                            component: ()=> import('@/views/frontend/SterlingSilverView.vue'),
                            meta: {
                                title: '925銀飾',
                                breadcrumb: true
                            }
                        },
                    ]
                },
                {
                    name: '購物車',
                    path: 'carts',
                    component: () => import('@/views/frontend/CartsView.vue'),
                    meta: {
                        title: '購物車',
                        breadcrumb: true
                    }
                },
                {
                    name: '結帳',
                    path: 'checkout/:orderId',
                    component: () => import('@/views/frontend/CheckoutView.vue'),
                    meta: {
                        title: '結帳',
                        breadcrumb: true
                    }
                },
                {
                    name: '登入', 
                    path: '/login',
                    component: ()=> import('@/views/frontend/LoginView.vue'),
                },
            ],
        },
        {
            path: '/admin',
            component: ()=> import('@/layouts/BackendLayout.vue'),
            redirect: '/admin/products',
            meta:{
                requiresAuth: true
            },
            children:[
                {
                    name: 'Products', 
                    path: 'products',
                    meta:{
                        requiresAuth: true
                    },
                    component: ()=> import('@/views/backend/ProductsView.vue'),
                },
                {
                    name: 'Orders', 
                    path: 'orders',
                    meta:{
                        requiresAuth: true
                    },
                    component: ()=> import('@/views/backend/OrdersView.vue'),
                },
                {
                    name: 'Coupons', 
                    path: 'coupons',
                    meta:{
                        requiresAuth: true
                    },
                    component: ()=> import('@/views/backend/CouponsView.vue'),
                }
            ]
        },
    ]
});

router.beforeEach( async (to,from,next) => {
    if(to.matched.some((item)=>{
        return item.meta.requiresAuth
    })){
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        if(!token){
            return next('/login');
        }
        const api = `${process.env.API_URL}/v2/api/user/check`;
        try {
            const res = await axios.post(api,{},{
                headers: {
                    Authorization: token
                }
            });
            if(res.data.success){
                next();
            }else{
                next('/login');
            }
        } catch (error) {
            next('/login');
        }
    }else{
        next();
    }
})


export default router;