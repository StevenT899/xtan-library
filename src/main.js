import 'bootstrap/dist/css/bootstrap.min.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCI27wpyWFuIQE9cNB1HdBy4xLd9-YnIW4',
  authDomain: 'xtan-library.firebaseapp.com',
  projectId: 'xtan-library',
  storageBucket: 'xtan-library.appspot.com',
  messagingSenderId: '268128752652',
  appId: '1:268128752652:web:7a3d3cc1ecdd8c41f14a29',
};

// Initialize Firebase
initializeApp(firebaseConfig);

const app = createApp(App);

app.use(PrimeVue, { theme: Aura });
app.use(router);

app.mount('#app');
