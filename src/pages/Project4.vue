<template>
  <div id="project4" class="project-page">
    <ProjectHero
      title="Project 4.0"
      :img="image"
      info="Typescript &amp; Python"
    />
    <ProjectTemplate :intro="intro" :link="link" :date="date" :role="role" />
  </div>
</template>

<script>
import ProjectHero from "../components/ProjectHero.vue";
import ProjectTemplate from "../components/ProjectTemplate.vue";
import project4Img from "../assets/img/project4.jpg";
export default {
  pageTitle: "Sander Backx - Project 4.0",

  components: {
    ProjectHero,
    ProjectTemplate,
  },
  data() {
    return {
      intro: `Four colleagues and I build a smart dispensing machine which can be managed by an admin panel. 
        Users can request a QR code from a website. The machine can scan this QR code, give the user personalized messages and open one of the locks.`,
      link: {
        title: "Video",
        shown: "Youtube",
        url: "https://youtu.be/orC074SIFBo",
      },
      date: "February 2021",
      role: [
        "Building the back end system. Ranging from adding new machines to user authentication. Build with Node/Express in Typescript with a MongoDB database.",
        "I also helped with the Python code to scan the QR code, sending requests to the back end, showing personlized messages and the opening and closing of the locks.",
      ],
      image: project4Img,
    };
  },
};
</script>

<style></style>
