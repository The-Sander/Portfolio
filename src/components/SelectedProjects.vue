<template>
  <section id="work">
    <div class="wrapper">
      <h2>
        <span class="line">Selected</span><span class="line">Projects</span>
      </h2>
      <div class="work-group">
        <ProjectCard
          v-for="(project, i) in projects"
          :key="i"
          :title="project.title"
          :img="project.img"
          :info="project.info"
          :route="project.route"
        />
      </div>
    </div>
  </section>
</template>

<script>
import ProjectCard from "./ProjectCard.vue";
import selfdrivingImg from "../assets/img/selfdriving.jpg";
import project4Img from "../assets/img/project4.jpg";
import botrossImg from "../assets/img/lion.jpg";
import tradingImg from "../assets/img/trading.jpg";

export default {
  components: {
    ProjectCard,
  },
  data() {
    return {
      projects: [
        {
          title: "Project 4.0",
          img: project4Img,
          info: "Typescript & Python",
          route: "project4",
        },
        {
          title: "Selfdriving Car",
          img: selfdrivingImg,
          info: "Python",
          route: "selfdriving",
        },
        {
          title: "Bot Ross",
          img: botrossImg,
          info: "Python",
          route: "botross",
        },
        {
          title: "Trading algorithm",
          img: tradingImg,
          info: "Typescript",
          route: "crypto",
        },
      ],
    };
  },
};
</script>

<style></style>
