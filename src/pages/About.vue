<template>
  <div>
    <NameHero />
    <AboutContent />
  </div>
</template>

<script>
import NameHero from "../components/NameHero.vue";
import AboutContent from "../components/AboutContent.vue";
export default {
  pageTitle: "Sander Backx - About me",

  components: {
    NameHero,
    AboutContent,
  },
};
</script>

<style></style>
