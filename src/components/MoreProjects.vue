<template>
  <section class="more-works">
    <div class="wrapper">
      <h2><span class="line">More</span><span class="line">Projects</span></h2>
      <div class="content">
        <div class="para">More personal and school projects.</div>
        <div class="all-works">
          <ProjectListItem
            v-for="(work, i) in works"
            :key="i"
            :route="work.route"
            :info="work.info"
            :title="work.title"
            :onsite="work.onsite"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ProjectListItem from "./ProjectListItem.vue";

export default {
  components: {
    ProjectListItem,
  },
  data() {
    return {
      works: [
        {
          title: "Genetic Algorithm",
          info: "Javascript",
          route: "genalgo",
          onsite: true,
        },
        {
          title: "Sorting Visualizer",
          info: "Javascript, CSS",
          route: "sorting",
          onsite: true,
        },
        {
          title: "Spotify Clone",
          info: "Javascript",
          route: "https://spotify-clone-4fe07.web.app/#",
          onsite: false,
        },
        {
          title: "Alumniavonden",
          info: "PHP, Javascript",
          route: "route",
          onsite: true,
        },
        {
          title: "The Box - Game",
          info: "C++",
          route: "route",
          onsite: true,
        },
      ],
    };
  },
};
</script>

<style></style>
