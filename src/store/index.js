import Vue from "vue";
import Vuex from "vuex";
import frontendModule from "./modules/frontend";
import backendModule from "./modules/backend";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    loadingCount: 0,
  },
  getters: {
    isLoading(state) {
      return state.loadingCount > 0;
    },
  },
  actions: {
    //載入loading狀態
    setLoading(context, status) {
      context.commit("LOADING", status);
    },
  },
  mutations: {
    LOADING(state, status) {
      if (status) {
        state.loadingCount += 1;
      } else {
        state.loadingCount = Math.max(0, state.loadingCount - 1);
      }
    },
  },
  modules: {
    frontend: frontendModule,
    backend: backendModule,
  },
});
