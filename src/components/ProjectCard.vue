<template>
  <router-link :to="route" class="work-card">
    <div class="thumb">
      <img :src="img" alt="" />
    </div>
    <div class="card-content">
      <div class="title">
        <h3>{{ title }}</h3>
        <div class="arr">
          <img src="../assets/img/arrow.svg" alt="" />
        </div>
      </div>
      <div class="project-info">
        <p>{{ info }}</p>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: ["title", "img", "info", "route"],
};
</script>

<style></style>
