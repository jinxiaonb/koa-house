import '@/index.scss';
import img from '@/test.jpg'


import { createApp } from 'vue';
import App from './App.vue';

console.log(process.env);

// Vue.config.productionTip = false;//vue的提示，在生产环境下需要设置为false

let app = createApp(App);
app.mount('#app');