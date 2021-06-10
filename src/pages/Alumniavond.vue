<template>
  <div id="alumni" class="project-page">
    <ProjectHero
      title="Alumni avond"
      :img="image"
      info="PHP &amp; Javascript"
    />
    <ProjectTemplate :intro="intro" :link="link" :date="date" :role="role" />
    <div class="wrapper">
      <section class="more">
        <div class="content">
          <article>
            <div class="img-wrapper">
              <figure>
                <img src="https://i.ibb.co/BjCw169/alumniavond.gif" alt="" />
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
  pageTitle: "Sander Backx - Alumni avond",

  components: {
    ProjectHero,
    ProjectTemplate,
  },
  data() {
    return {
      intro:
        "This was a project for my course 'PHP project'. We were tasked to create an event planner for alumni nights.",
      link: {
        title: "Code",
        shown: "Github",
        url: "https://github.com/itfactory-tm/ProjectPHP-14",
      },
      date: "February 2020 - May 2020",
      role: [
        "During this project I made some of the pages to organise events and get an overview of these events. I also made the pages that allow users to answer to invetations without the need of login credentials.",
        "I am the most proud of the mailing filters I made with Javascript. When sending an invetation to users you can ask questions. These questions and answers can be used as filters for mail adresses.",
      ],
      image: "",
    };
  },
};
</script>

<style></style>
