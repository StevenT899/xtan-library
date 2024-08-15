import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import 'bootstrap/dist/css/bootstrap.min.css'; 
const app = createApp(App);

app.use(PrimeVue, { theme: Aura }); 

app.mount('#app');