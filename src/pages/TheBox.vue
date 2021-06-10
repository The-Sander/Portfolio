<template>
  <div id="thebox" class="project-page">
    <ProjectHero title="The Box" :img="image" info="C++" />
    <ProjectTemplate :intro="intro" :link="link" :date="date" :role="role" />
    <div class="wrapper">
      <section class="more">
        <div class="content">
          <article>
            <div class="img-wrapper">
              <figure>
                <img src="https://i.ibb.co/k1SWrfM/game.gif" alt="" />
              </figure>
            </div>
          </article>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import ProjectHero from "../components/ProjectHero.vue";
import ProjectTemplate from "../components/ProjectTemplate.vue";

export default {
  pageTitle: "Sander Backx - The Box",

  components: {
    ProjectHero,
    ProjectTemplate,
  },
  data() {
    return {
      intro:
        "This was a project for my programming course in 'Game Development'. We were tasked to create a 2D game level.",
      link: {
        title: "Code",
        shown: "Github",
        url: "https://github.com/itfactory-tm/ProjectPHP-14",
      },
      date: "February 2018 - June 2018",
      role: ["", ""],
      image: "",
    };
  },
};
</script>

<style></style>
