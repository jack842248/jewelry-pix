import axios from 'axios'

export default {
    namespaced: true,
    state: {
        products: [],
        carts: {
            carts:[]
        },
        tempProduct: {},
        order: {
            id: '',
            is_paid: false,
            user: {
                name: '',
            },
        }
    },
    actions:{
        //取得商品資料
        async getProducts(context) {
            context.dispatch('setLoading', true, { root: true });
            const api = `${process.env.API_URL}/v2/api/${process.env.CUSTOM_PATH}/products/all`;
            try {
                const res = await axios.get(api);
                if (res.data.success) {
                    context.commit('PRODUCTS', res.data.products);
                }else{
                    throw new Error(res.data.message);
                }
            } finally {
                context.dispatch('setLoading', false, { root: true });
            }
        },
        //加入購物車
        async addToCart(context,payload){
            context.dispatch('setLoading', true, { root: true });
            const api = `${process.env.API_URL}/v2/api/${process.env.CUSTOM_PATH}/cart`;
            try{
                const res = await axios.post(api,{ 'data':{
                    "product_id": payload.id,
                    "qty": payload.qty
                }})
                if(res.data.success){
                    context.commit('CARTS', res.data.data);
                }else{
                    throw new Error(res.data.message);
                }
                return res
            } finally {
                context.dispatch('setLoading', false, { root: true });
            }
        },
        //顯示商品詳細資訊
        async openProductDetail(context,id){
            context.dispatch('setLoading', true, { root: true });
            const api = `${process.env.API_URL}/v2/api/${process.env.CUSTOM_PATH}/product/${id}`;
            try {
                const res = await axios.get(api);
                if(res.data.success){
                    context.commit('TEMPPRODUCT', res.data.product);
                }else{
                    throw new Error(res.data.message);
                }
                return res;
            } finally {
                context.dispatch('setLoading', false, { root: true });
            }
        },
        //取得購物車資料
        async getCarts(context){
            context.dispatch('setLoading', true, { root: true });
            const api = `${process.env.API_URL}/v2/api/${process.env.CUSTOM_PATH}/cart`;
            try {
                const res = await axios.get(api);
                if(res.data.success){
                    context.commit('CARTS', res.data.data);
                }else{
                    throw new Error(res.data.message);
                }
            } finally {
                context.dispatch('setLoading', false, { root: true });
            }
        },
        //刪除購物車
        async removeCart(context,payload){
            context.dispatch('setLoading', true, { root: true });
            const api = `${process.env.API_URL}/v2/api/${process.env.CUSTOM_PATH}/cart/${payload.id}`;
            try {
                const res = await axios.delete(api);
                return res
            } finally {
                context.dispatch('setLoading', false, { root: true });
            }
        },
        //套用優惠券
        async addCouponCode(context,code){
            context.dispatch('setLoading', true, { root: true });
            const api = `${process.env.API_URL}/api/${process.env.CUSTOM_PATH}/coupon`;
            try {
                const res = await axios.post(api,{data:{
                    code: code
                }});
                return res
            } finally {
                context.dispatch('setLoading', false, { root: true });
            }
        },
        //建立訂單
        async createOrder(context,payload){
            context.dispatch('setLoading', true, { root: true });
            const api = `${process.env.API_URL}/v2/api/${process.env.CUSTOM_PATH}/order`;
            try {
                const res = await axios.post(api,payload);
                return res
            } finally {
                context.dispatch('setLoading', false, { root: true });
            }
        },
        //取得訂單
        async getOrder(context,orderId){
            context.dispatch('setLoading', true, { root: true });
            const api = `${process.env.API_URL}/v2/api/${process.env.CUSTOM_PATH}/order/${orderId}`;
            try {
                const res = await axios.get(api,orderId);
                if(res.data.success){
                    context.commit('ORDER', res.data.order);
                }else{
                    throw new Error(res.data.message);
                }
                return res
            } finally {
                context.dispatch('setLoading', false, { root: true });
            }
        },
        //訂單付款
        async payOrder(context,orderId){
            context.dispatch('setLoading', true, { root: true });
            const api = `${process.env.API_URL}/v2/api/${process.env.CUSTOM_PATH}/pay/${orderId}`;
            try {
                const res = await axios.post(api,orderId);
                if(res.data.success){
                    context.commit('CARTS', {
                        carts: [],
                        total: 0,
                        final_total: 0
                    });
                }else{
                    throw new Error(res.data.message);
                }
                return res
            } finally {
                context.dispatch('setLoading', false, { root: true });
            }
        },
        //後台登入
        async signin(context,payload) {
            context.dispatch('setLoading', true, { root: true });
            const api = `${process.env.API_URL}/v2/admin/signin`;
            try {
                const res = await axios.post(api,{
                    username: payload.username ,
                    password: payload.password
                });
                return res
            } finally {
                context.dispatch('setLoading', false, { root: true });
            }
        },
    },
    mutations: {
        PRODUCTS(state, products){
            state.products = products;
        },
        CARTS(state, carts){
            state.carts = {
                carts: carts.carts || [],
                total: carts.total,
                final_total: carts.final_total
            }
        },
        TEMPPRODUCT(state, products){
            state.tempProduct = {
                ...products,
                num: ''
            }
        },
        ORDER(state, order){
            state.order = order;
        }
    },
    getters:{
        carts(state){
            return state.carts;
        },
        products(state){
            return state.products;
        },
        order(state){
            return state.order;
        },
        tempProduct(state){
            return state.tempProduct;
        },
    }
};