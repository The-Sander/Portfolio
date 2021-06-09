<template>
  <div id="selfdriving" class="project-page">
    <ProjectHero title="Selfdriving car" :img="image" info="JS &amp; Python" />
    <ProjectTemplate :intro="intro" :link="link" :date="date" :role="role" />
  </div>
</template>

<script>
import ProjectHero from "../components/ProjectHero.vue";
import ProjectTemplate from "../components/ProjectTemplate.vue";
import image from "../assets/img/selfdriving.jpg";

export default {
  pageTitle: "Sander Backx - Selfdriving car",
  components: {
    ProjectHero,
    ProjectTemplate,
  },
  data() {
    return {
      image,
      intro:
        "This was a project for my course AI Projects. We had the opportunity to choose between different subjects and my colleagues and I chose to try to create a selfdriving car.",
      link: {
        title: "Code",
        shown: "Github",
        url: "www.github.com",
      },
      date: "November 2020",
      role: [
        "I used Fast.ai image regression. Our data existed of game-frames with corresponding controller input which we recorded while driving around. ",
        "This data we used to teach our model to give controller input when handed a game frame. This result we then gave to a virtual controller which controlled the game.",
      ],
    };
  },
};
</script>

<style></style>
