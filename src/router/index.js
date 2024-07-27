import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import NegociacionView from '../views/NegociacionView.vue';
import HistorialMovView from '../views/HistorialMovView.vue';
import EstadoActualView from '../views/EstadoActualView.vue';
import store from '@/store'; // Asegúrate de importar el store

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/PrintPrincipal',
    name: 'PrintPrincipal',
    component: () => import('../components/PrintPrincipal.vue'),
  },
  {
    path: '/InvestAnalysis',
    name: 'InvestAnalysis',
    component: () => import('../components/InvestAnalysis.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/PurchaseSale',
    name: 'PurchaseSale',
    component: NegociacionView,
    meta: { requiresAuth: true }, // Requiere autenticación
  },
  {
    path: '/HistorialMov',
    name: 'HistorialMov',
    component: HistorialMovView,
    meta: { requiresAuth: true }, // Requiere autenticación
  },
  {
    path: '/EstadoActual',
    name: 'EstadoActual',
    component: EstadoActualView,
    meta: { requiresAuth: true }, // Requiere autenticación
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Guarda de navegación global para verificar autenticación
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.userName === '') {
      next({
        path: '/',
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
