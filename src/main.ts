import { createApp } from 'vue';
import { createPinia } from 'pinia';
import "../src/assets/main.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'flag-icons/css/flag-icons.min.css';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ElementPlus);

app.mount('#app');
