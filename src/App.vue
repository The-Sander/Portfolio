<template>
  <div class="content">
    <Loader />
    <nav class="navbar">
      <div class="wrapper">
        <router-link to="/" clas="nav-home active">Home</router-link>
        <ul>
          <li>
            <router-link to="/about">About</router-link>
          </li>
          <li><router-link to="/internship">Internship</router-link></li>
          <!-- <li><router-link to="/">Projects</router-link></li> -->
        </ul>
      </div>
    </nav>
    <router-view v-slot="{ Component, route }">
      <transition
        v-on:before-leave="beforeLeave"
        v-on:enter="onEnter"
        name="fade"
        mode="out-in"
        :enter-leave-class="route.meta.leaveClass"
      >
        <component :is="Component" />
      </transition>
    </router-view>
    <Footer />
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
        duration: 0.3,
      }).to(loading, {
        css: { scaleX: 0, scaleY: 0 },
        duration: 0.3,
      });

      gsap.to(loadbg, { visibility: "hidden", delay: 1 });
    },
    onEnter() {
      console.log("entered");
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
