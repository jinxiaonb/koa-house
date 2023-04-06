import '@scss/index.scss';


import { createApp } from 'vue';
import App from './App.vue';

console.log(process.env);

// Vue.config.productionTip = false;//vue的提示，在生产环境下需要设置为false

import router from '@router/index.js';
import store from '@store/index.js';


let app = createApp(App);

app.use(router).use(store).mount('#app');


