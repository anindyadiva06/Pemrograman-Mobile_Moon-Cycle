import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import RiwayatMenstruasi from '@/views/RiwayatMenstruasi.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/riwayat-menstruasi' },
  {
    path: '/riwayat-menstruasi',
    name: 'RiwayatMenstruasi',
    component: () => import('../views/RiwayatMenstruasi.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: "/rekomendasi-nutrisi",
    name: "RekomendasiNutrisi",
    component: () => import("@/views/RekomendasiNutrisi.vue"),
    meta: { requiresAuth: true }
  },
  { path: '', redirect: '/landing' },  // Mengarahkan ke halaman LandingPage secara default
  {
    path: '/landing', 
    component: () => import('../views/LandingPage.vue'),
    meta: { menuDisabled: true }, 
  },
  {
    path: '/login', 
    component: () => import('../views/LoginPage.vue'),
    meta: { menuDisabled: true }, 
  },
  {
    path: '/register', 
    component: () => import('../views/RegisterPage.vue'),
    meta: { menuDisabled: true },
  },
  {
    path: '/homepage',
    component: () => import('../views/HomePage.vue'),
    meta: { menuDisabled: false }, 
  },
  {
    path: '/folder/:id',
    component: () => import('../views/FolderPage.vue'),
  },
  {
    path: '/akun', // Rute baru untuk halaman AkunPage
    component: () => import('../views/AkunPage.vue'),
  },
  {
    path: "/profile", // Rute untuk profile
    component: () => import("../views/ProfilePage.vue"),
  },
  {
    path: '/fase-menstruasi', // Rute untuk Fase Menstruasi
    component: () => import('../views/FaseMenstruasi.vue'),
  },
  {
    path: '/fase-folikular', // Rute untuk Fase Folikular
    component: () => import('../views/FaseFolikular.vue'),
  },
  {
    path: '/fase-ovulasi', // Rute untuk Fase Ovulasi
    component: () => import('../views/FaseOvulasi.vue'),
  },
  {
    path: '/fase-luteal', // Rute untuk Fase Luteal
    component: () => import('../views/FaseLuteal.vue'),
  },
  // Rute lainnya (misalnya Home, Login, Register, dsb)
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
