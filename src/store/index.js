import Vue from 'vue'
import Vuex from 'vuex'
// import * as getters from './getters.js'

Vue.use(Vuex);

/** 状态定义 */
export const state = {
    keywords:'',//关键词
};

export default new Vuex.Store({
    state,
})
