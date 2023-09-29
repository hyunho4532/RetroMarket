import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@popperjs/core/dist/umd/popper.min.js';

import router from './router';

import { createApp } from 'vue';
import App from './views/Home.vue';

const app = createApp(App);

app.config.productionTip = false;

app.use(router).mount('#app');