import { createStore } from "vuex";

import user from '@store/user/index.js';

const store = createStore({
    state: {},
    getters: {},
    actions: {},
    mutations: {},
    modules: {
        user
    }
});

export default store;