import { createApp } from 'vue';
import App from './App.vue';
import router from './router';  // Adjust the path if needed
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

createApp(App)
  .use(router)
  .mount('#app');


