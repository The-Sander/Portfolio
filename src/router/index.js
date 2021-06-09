import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import Home from "../pages/Home.vue";
import About from "../pages/About.vue";
import Internship from "../pages/Internship.vue";
import Projects from "../pages/Projects.vue";
import Selfdriving from "../pages/Selfdriving.vue";
import Project4 from "../pages/Project4.vue";
import BotRoss from "../pages/BotRoss.vue";
import Crypto from "../pages/Crypto.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: Home,
      meta: {
        enterClass: "fade-enter-to",
        leaveClass: "fade-enter-from",
      },
    },
    {
      path: "/about",
      component: About,
      meta: {
        enterClass: "fade-enter-to ",
        leaveClass: "fade-leave-from",
      },
    },
    {
      path: "/internship",
      component: Internship,
      meta: {
        enterClass: "fade-enter-to ",
        leaveClass: "fade-leave-from",
      },
    },
    {
      path: "/projects",
      component: Projects,
      meta: {
        enterClass: "fade-enter-to ",
        leaveClass: "fade-leave-from",
      },
    },
    {
      path: "/selfdriving",
      component: Selfdriving,
      meta: {
        enterClass: "fade-enter-to ",
        leaveClass: "fade-leave-from",
      },
    },
    {
      path: "/project4",
      component: Project4,
      meta: {
        enterClass: "fade-enter-to ",
        leaveClass: "fade-leave-from",
      },
    },
    {
      path: "/botross",
      component: BotRoss,
      meta: {
        enterClass: "fade-enter-to ",
        leaveClass: "fade-leave-from",
      },
    },
    {
      path: "/crypto",
      component: Crypto,
      meta: {
        enterClass: "fade-enter-to ",
        leaveClass: "fade-leave-from",
      },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (to.hash) {
          resolve({
            selector: to.hash,
          });
        } else if (savedPosition) {
          resolve({ left: savedPosition.left, top: savedPosition.top });
        } else {
          resolve({ left: 0, top: 0 });
        }
      }, 200);
    });
  },
});

export default router;
