

import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from "vue-router";
import Landing from "@/components/Landing.vue";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';


createApp(App).mount('#app')
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Landing,
    }
  ],
});