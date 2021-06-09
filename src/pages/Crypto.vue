<template>
  <div id="crypto" class="project-page">
    <ProjectHero title="Crypto" :img="image" />
    <ProjectTemplate :intro="intro" :link="link" :date="date" :role="role" />
  </div>
</template>

<script>
import ProjectHero from "../components/ProjectHero.vue";
import ProjectTemplate from "../components/ProjectTemplate.vue";
import tradingImg from "../assets/img/trading.jpg";
export default {
  pageTitle: "Sander Backx - Crypto",
  components: {
    ProjectHero,
    ProjectTemplate,
  },
  data() {
    return {
      intro: "This is the intro :D",
      link: {
        title: "Code",
        shown: "Github",
        url: "www.github.com",
      },
      date: "November 2020",
      role: ["My role first p", "my role second p"],
      image: tradingImg,
    };
  },
};
</script>

<style></style>
