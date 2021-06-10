<template>
  <div class="page-content">
    <Loader />
    <nav class="navbar">
      <div class="wrapper">
        <router-link to="/" clas="nav-home active">Home</router-link>
        <ul class="main-menu">
          <li>
            <router-link to="/about" exact-active-class="active"
              >About</router-link
            >
          </li>
          <li>
            <router-link to="/internship">Internship</router-link>
          </li>
          <li>
            <router-link to="/#work" exact-active-class="noactive"
              >Projects</router-link
            >
          </li>
        </ul>
      </div>
    </nav>
    <nav class="mobile-menu">
      <ul class="menu-items">
        <li>
          <router-link to="/" exact-active-class="active">Home</router-link>
        </li>
        <li>
          <router-link to="/about" exact-active-class="active"
            >About</router-link
          >
        </li>
        <li>
          <router-link to="/internship">Internship</router-link>
        </li>
        <li>
          <router-link to="/#work" exact-active-class="noactive"
            >Projects</router-link
          >
        </li>
      </ul>
    </nav>
    <div class="page">
      <router-view v-slot="{ Component }">
        <transition v-on:before-leave="beforeLeave" name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
      <Footer />
    </div>
  </div>
</template>

<script>
import Loader from "./components/Loader.vue";
import Footer from "./components/Footer.vue";
import { gsap } from "gsap";
export default {
  components: {
    Loader,
    Footer,
  },
  data() {
    return {
      mouse: { x: 0, y: 0 },
    };
  },
  created() {
    window.addEventListener("mousemove", this.handleMouseMove);
  },

  unmounted() {
    window.removeEventListener("mousemove", this.handleMouseMove);
  },

  methods: {
    handleMouseMove(event) {
      this.mouse.x = event.clientX;
      this.mouse.y = event.clientY;
      const loading = document.querySelector(".loading");
      const bounding = loading.getBoundingClientRect();
      loading.style.left = `${this.mouse.x}px`;
      loading.style.top = `${this.mouse.y}px`;
    },
    beforeLeave() {
      const loadbg = document.querySelector(".load-bg");
      const loading = document.querySelector(".loading");
      const tl = gsap.timeline();
      gsap.to(loadbg, { visibility: "visible" });
      tl.to(loading, {
        css: { scaleX: 25, scaleY: 25 },
        duration: 0.5,
      }).to(loading, {
        css: { scaleX: 0, scaleY: 0 },
        duration: 0.5,
      });

      gsap.to(loadbg, { visibility: "hidden", delay: 1 });
    },
  },
};
</script>

<style></style>
