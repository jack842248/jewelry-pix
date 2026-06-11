import axios from 'axios'

export default {
    namespaced: true,
    state: {
        pagination: {},
        products: [],
        orders: [],
        coupons: []
    },
    actions:{
        //取得商品資料
        async getProducts(context,page) {
            context.dispatch('setLoading', true, { root: true });
            const api = `${process.env.API_URL}/v2/api/${process.env.CUSTOM_PATH}/admin/products?page=${page}`;
            try {
                const res = await axios.get(api);
                if(res.data.success){
                    context.commit('PRODUCTS', res.data.products);
                    context.commit('PAGINATION', res.data.pagination);
                }else{
                    throw new Error(res.data.message);
                }
            } finally {
                context.dispatch('setLoading', false, { root: true });
            }
        },
        //更新商品資料
        async updateProduct(context,payload){
            context.dispatch('setLoading', true, { root: true });
            let api = `${process.env.API_URL}/v2/api/${process.env.CUSTOM_PATH}/admin/product`;
            let httpMethod = 'post'
            if(!payload.isNew){
                api = `${process.env.API_URL}/v2/api/${process.env.CUSTOM_PATH}/admin/product/${payload.tempProduct.id}`;
                httpMethod = 'put'
            }
            try {
                const res = await axios[httpMethod](api, {data: payload.tempProduct});
                return res
            } finally {
                context.dispatch('setLoading', false, { root: true });
            }
        },
        //刪除商品資料
        async removeProduct(context,id){
            context.dispatch('setLoading', true, { root: true });
            const api = `${process.env.API_URL}/v2/api/${process.env.CUSTOM_PATH}/admin/product/${id}`;
            try {
                const res = await axios.delete(api);
                return res
            } finally {
                context.dispatch('setLoading', false, { root: true });
            }
        },
        //上傳圖片
        async updateImage(context,formData){
            const api = `${process.env.API_URL}/v2/api/${process.env.CUSTOM_PATH}/admin/upload`;
            const res = await axios.post(api,formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return res
        },
        //取得訂單資料
        async getOrders(context,page) {
            context.dispatch('setLoading', true, { root: true });
            const api = `${process.env.API_URL}/v2/api/${process.env.CUSTOM_PATH}/admin/orders?page=${page}`;
            try {
                const res = await axios.get(api);
                if(res.data.success){
                    context.commit('ORDERS', res.data.orders);
                    context.commit('PAGINATION', res.data.pagination);
                }else{
                    throw new Error(res.data.message);
                }
            } finally {
                context.dispatch('setLoading', false, { root: true });
            }
        },
        //取得優惠券資料
        async getCoupons(context,page) {
            context.dispatch('setLoading', true, { root: true });
            const api = `${process.env.API_URL}/v2/api/${process.env.CUSTOM_PATH}/admin/coupons?page=${page}`;
            try {
                const res = await axios.get(api);
                if(res.data.success){
                    context.commit('COUPONS',res.data.coupons);
                    context.commit('PAGINATION',res.data.pagination)
                }else{
                    throw new Error(res.data.message);
                }
            } finally {
                context.dispatch('setLoading', false, { root: true });
            }
        },
        //更新優惠券資料
        async updateCoupon(context,payload){
            context.dispatch('setLoading', true, { root: true });
            let api = `${process.env.API_URL}/v2/api/${process.env.CUSTOM_PATH}/admin/coupon`;
            let httpMethod = 'post'
            if(!payload.isNew){
                api = `${process.env.API_URL}/v2/api/${process.env.CUSTOM_PATH}/admin/coupon/${payload.tempCoupon.id}`;
                httpMethod = 'put'
            }
            try {
                const res = await axios[httpMethod](api,{data:payload.tempCoupon});
                return res;
            } finally {
                context.dispatch('setLoading', false, { root: true });
            }
        },
        //刪除優惠券資料
        async removeCoupon(context,id){
            context.dispatch('setLoading', true, { root: true });
            const api = `${process.env.API_URL}/v2/api/${process.env.CUSTOM_PATH}/admin/coupon/${id}`;
            try {
                const res = await axios.delete(api);
                return res;
            } finally {
                context.dispatch('setLoading', false, { root: true });
            }
        },
        //登出
        async signout(context){
            context.dispatch('setLoading', true, { root: true });
            const api = `${process.env.API_URL}/v2/logout`;
            try {
                const res = await axios.post(api);
                return res
            } finally {
                context.dispatch('setLoading', false, { root: true });
            }
        }
    },
    mutations: {
        PAGINATION(state,pagination){
            state.pagination = pagination;
        },
        PRODUCTS(state,products){
            state.products = products;
        },
        ORDERS(state,orders){
            state.orders = orders;
        },
        COUPONS(state,coupons){
            state.coupons = coupons;
        }
    },
    getters:{
        pagination(state){
            return state.pagination;
        },
        products(state){
            return state.products;
        },
        orders(state){
            return state.orders;
        },
        coupons(state){
            return state.coupons;
        },
    }
};