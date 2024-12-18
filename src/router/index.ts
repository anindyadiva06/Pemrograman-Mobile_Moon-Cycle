import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/landing',
    meta: { requiresAuth: false }
  },
  {
    path: '/landing',
    name: 'LandingPage',
    component: () => import('../views/LandingPage.vue'),
    meta: { requiresAuth: false, menuDisabled: true }
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import('../views/LoginPage.vue'),
    meta: { requiresAuth: false, menuDisabled: true }
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: () => import('../views/RegisterPage.vue'),
    meta: { requiresAuth: false, menuDisabled: true }
  },
  {
    path: '/homepage',
    name: 'HomePage',
    component: () => import('../views/HomePage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/riwayat-menstruasi',
    name: 'RiwayatMenstruasi',
    component: () => import('../views/RiwayatMenstruasi.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/akun',
    name: 'AkunPage',
    component: () => import('../views/AkunPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'ProfilePage',
    component: () => import('../views/ProfilePage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/rekomendasi-nutrisi',
    name: 'RekomendasiNutrisi',
    component: () => import('../views/RekomendasiNutrisi.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/fase-menstruasi',
    name: 'FaseMenstruasi',
    component: () => import('../views/FaseMenstruasi.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/fase-folikular',
    name: 'FaseFolikular',
    component: () => import('../views/FaseFolikular.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/fase-ovulasi',
    name: 'FaseOvulasi',
    component: () => import('../views/FaseOvulasi.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/fase-luteal',
    name: 'FaseLuteal',
    component: () => import('../views/FaseLuteal.vue'),
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
