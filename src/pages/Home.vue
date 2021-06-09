<template>
  <div>
    <Hero />
    <About />
    <SelectedProjects />
    <Internship />
    <MoreProjects />
  </div>
</template>

<script>
import Hero from "../components/Hero.vue";
import About from "../components/AboutCTA.vue";
import Internship from "../components/InternshipCTA.vue";
import SelectedProjects from "../components/SelectedProjects.vue";
import MoreProjects from "../components/MoreProjects.vue";
export default {
  pageTitle: "Sander Backx - Home",
  components: {
    Hero,
    About,
    Internship,
    SelectedProjects,
    MoreProjects,
  },
};
</script>

<style></style>
