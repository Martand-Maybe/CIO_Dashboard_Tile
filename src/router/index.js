import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  // ... existing routes ...
  {
    path: '/cio-interrogator',
    name: 'CIOInterrogator',
    component: () => import('../pages/CioInterrogator.vue'),
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router; 