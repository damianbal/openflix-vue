import Vue from "vue";
import Router from "vue-router";
import Browse from "./views/Browse.vue";
import Landing from "./views/Landing.vue";
import Play from "./views/Play.vue";
import SignIn from "./views/SignIn.vue";
import SignUp from "./views/SignUp.vue";
import Liked from "./views/Liked.vue";
import Popular from "./views/Popular.vue";


Vue.use(Router);

let router =  new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      name: "landing",
      component: Landing,
      props: true,
      meta: {
        auth: false
      }
    },
    {
      path: "/browse/:page_id/:genre_id",
      name: "browse",
      component: Browse,
      props: true,
            meta: {
        auth: true
      }
    },
    {
      path: "/play/:movie_id",
      name: "play",
      component: Play,
      props: true,
            meta: {
              auth: true
            }
    },
    {
      path: "/sign-in",
      name: "sign-in",
      component: SignIn,
      props: true,
      meta: {
        auth: false
      }
    },
    {
      path: "/sign-up",
      name: "sign-up",
      component: SignUp,
      props: true,
      meta: {
        auth: false
      }
    },
    {
      path: "/liked",
      name: "liked",
      component: Liked,
      props: true,
      meta: {
        auth: true
      }
    },
    {
      path: "/popular",
      name: "popular",
      component: Popular,
      props: true,
      meta: {
        auth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  
  // if route requires auth and there is no token, redirect to landing
  if(to.meta.auth == true && localStorage.getItem("token") == null) {
    next('/sign-in')
  }
  else {
    next()
  }
})

export default router
