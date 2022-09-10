import Vue from "vue";
import VueRouter from "vue-router";
import VueCookies from "vue-cookies";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "LoginView",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/users",
    name: "Users",
    component: () => import("../views/UserView.vue"),
  },
  {
    path: "/skills",
    name: "Skills",
    component: () => import("../views/SkillsView.vue"),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== "LoginView" && !VueCookies.get("token"))
    next({ name: "LoginView" });
  // if the user is not authenticated, `next` is called twice
  else if (to.name == "LoginView" && VueCookies.get("token")) next("/users");
  else next();
});

export default router;
