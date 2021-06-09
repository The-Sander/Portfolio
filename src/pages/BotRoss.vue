<template>
  <div id="botross" class="project-page">
    <ProjectHero title="Bot Ross" :img="image" />
    <ProjectTemplate :intro="intro" :link="link" :date="date" :role="role" />
  </div>
</template>

<script>
import ProjectHero from "../components/ProjectHero.vue";
import ProjectTemplate from "../components/ProjectTemplate.vue";
import botrossImg from "../assets/img/lion.jpg";

export default {
  pageTitle: "Sander Backx - Bot Ross",

  components: {
    ProjectHero,
    ProjectTemplate,
  },
  data() {
    return {
      intro:
        "This was a project for my course Big Data. We were tasked to create an image classifier. We chose to classify paintings and painters.",
      link: {
        title: "Code",
        shown: "Github",
        url: "https://github.com/YoriVerbist/Bot-Ross",
      },
      date: "November 2020",
      role: [
        "During this project I worked together with my colleague to create an image classifier using Fast.ai. We used Bing api to retreive images from the web which we used for training. Given an image, our model predicts which painter painted the image.",
        "As an extension we added NST (Neural Style Transfer) that combines an image and a painting style to create a new image. Sadly, this process takes too long to do on the web.",
      ],
      image: botrossImg,
    };
  },
};
</script>

<style></style>
