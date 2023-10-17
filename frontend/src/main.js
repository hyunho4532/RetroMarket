import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@popperjs/core/dist/umd/popper.min.js';

import router from './router/router';
import store from './store/store';

import { createApp } from 'vue';
import { initializeApp } from 'firebase/app';
import App from './views/Main.vue';

const firebaseConfig = {
    apiKey: "AIzaSyCF4Q1JI4cYZtgKja0leJDAtpZ1tf5aPVw",
    authDomain: "flutterusedproduct.firebaseapp.com",
    projectId: "flutterusedproduct",
    storageBucket: "flutterusedproduct.appspot.com",
    messagingSenderId: "284080438877",
    appId: "1:284080438877:web:715261c267bdf87edc57b4",
    measurementId: "G-LJ8S8NKXYR"
};

initializeApp(firebaseConfig);

const vueApp = createApp(App);

vueApp.config.productionTip = false;

vueApp.use(store).use(router).mount('#app');