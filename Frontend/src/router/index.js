// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Landing from '@/components/Landing.vue';
import ShowData from '@/components/ShowData.vue';

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing
  },
  {
    path: '/show-data',
    name: 'ShowData',
    component: ShowData
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
