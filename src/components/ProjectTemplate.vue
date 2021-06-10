<template>
  <div>
    <div class="wrapper">
      <section class="intro">
        <p class="big">
          {{ intro }}
        </p>
        <div class="project-info">
          <div class="info">
            <h5>{{ link.title }}</h5>
            <p>
              <a target="_blank" :href="link.url">{{ link.shown }}</a>
            </p>
          </div>
          <div class="info">
            <h5>Project date</h5>
            <p>{{ date }}</p>
          </div>
        </div>
      </section>
    </div>
    <div class="wrapper">
      <section class="main-section" v-if="role[0].lenght > 0">
        <article class="section">
          <div class="heading">
            <h4>My role</h4>
          </div>
          <div class="section-content">
            <div>
              <p class="para" v-for="(par, i) in role" :key="i">{{ par }}</p>
            </div>
          </div>
        </article>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  props: ["intro", "link", "date", "role"],
};
</script>

<style></style>
