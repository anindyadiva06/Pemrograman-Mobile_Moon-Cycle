import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/landing',  // Mengarahkan ke halaman LandingPage secara default
  },
  {
    path: '/landing', // Rute untuk LandingPage
    component: () => import('../views/LandingPage.vue'),
  },
  {
    path: '/folder/:id',
    component: () => import('../views/FolderPage.vue'),
  },
  {
    path: '/akun', // Rute baru untuk halaman AkunPage
    component: () => import('../views/AkunPage.vue'),
  },
  // Rute lainnya (misalnya Home, Login, Register, dsb)
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
