import { createRouter, createWebHistory } from "vue-router";

//views
import RegisterNewPatientView from "../views/RegisterNewPatientView.vue";
import RegisterServiceView from "../views/RegisterServiceView.vue";
import TableFichasPendientesView from "../views/TableFichasPendientesView.vue";
import TableQueView from "../views/TableQueView.vue";
import SuccessView from "../views/SuccessView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    /**
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    } */
    {
      path: "/",
      name: "register-new-patient",
      component: RegisterNewPatientView,
    },
    {
      path: "/register-service",
      name: "register-service",
      component: RegisterServiceView,
    },
    {
      path: "/table-fichas-pendientes",
      name: "table-fichas-pendientes",
      component: TableFichasPendientesView,
    },
    {
      path: "/table-que",
      name: "table-que",
      component: TableQueView,
    },
    {
      path: "/success",
      name: "success",
      component: SuccessView,
    },
  ],
});

export default router;
