import { createRouter, createWebHistory } from 'vue-router';
import CIOInterrogator from '../pages/CIOinterrogator.vue';

const routes = [
  // ... existing routes ...
  {
    path: '/cio-interrogator',
    name: 'CIOInterrogator',
    component: CIOInterrogator
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router; 