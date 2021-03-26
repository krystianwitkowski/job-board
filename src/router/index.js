import { createRouter, createWebHashHistory } from "vue-router";

import SignUp from "../views/SignUp.vue";
import SignIn from '../views/SignIn.vue';
import Dashboard from '../views/Dashboard.vue';

const routes = [
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp
  },
  {
    path: "/signin",
    name: "SignIn",
    component: SignIn
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
