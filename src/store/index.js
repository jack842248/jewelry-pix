import Vue from 'vue'
import Vuex from 'vuex'
import frontendModule from './modules/frontend'
import backendModule from './modules/backend'

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    state: {
        isLoading: false,
    },
    actions:{
        //載入loading狀態
        setLoading(context, status){
            context.commit('LOADING', status);
        }
    },
    mutations: {
        LOADING(state, status){
            state.isLoading = status;
        }
    },
    modules:{
        frontend: frontendModule,
        backend: backendModule
    }
});