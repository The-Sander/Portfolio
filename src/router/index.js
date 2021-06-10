import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../pages/Home.vue";
import About from "../pages/About.vue";
import Internship from "../pages/Internship.vue";
import Projects from "../pages/Projects.vue";
import Selfdriving from "../pages/Selfdriving.vue";
import Project4 from "../pages/Project4.vue";
import BotRoss from "../pages/BotRoss.vue";
import Crypto from "../pages/Crypto.vue";
import GeneticAlgorithm from "../pages/GeneticAlgorithm.vue";
import SortingVisualizer from "../pages/SortingVisualizer.vue";
import Alumniavond from "../pages/Alumniavond.vue";
import TheBox from "../pages/TheBox.vue";
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

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
      path: "/home",
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
    {
      path: "/genalgo",
      component: GeneticAlgorithm,
      meta: {
        enterClass: "fade-enter-to ",
        leaveClass: "fade-leave-from",
      },
    },
    {
      path: "/sorting",
      component: SortingVisualizer,
      meta: {
        enterClass: "fade-enter-to ",
        leaveClass: "fade-leave-from",
      },
    },
    {
      path: "/alumni",
      component: Alumniavond,
      meta: {
        enterClass: "fade-enter-to ",
        leaveClass: "fade-leave-from",
      },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (savedPosition) {
          resolve({ ...savedPosition });
        } else if (to.hash) {
          resolve({
            el: to.hash,
            behavior: "smooth",
          });
        } else {
          resolve({ left: 0, top: 0 });
        }
      }, 400);
    });
  },
});

export default router;
