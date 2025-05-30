import HomePage from "./components/HomePage.vue";
import LoginPage from "./components/LoginPage.vue";
import SignUp from "./components/SignUp.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    name: "Home",
    component: HomePage,
    path: "/",
  },
  {
    name: "SignUp",
    component: SignUp,
    path: "/SignUp",
  },
  {
    name:"LoginPage",
    component: LoginPage,
    path: "/LoginPage"
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
