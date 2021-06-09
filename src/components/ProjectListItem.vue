<template>
  <router-link :to="route" class="work">
    <div class="work-content">
      <div class="title">
        <h3>{{ title }}</h3>
        <div class="arr">
          <img src="../assets/img/arrow.svg" alt="" />
        </div>
      </div>
      <div class="info">
        <p>{{ info }}</p>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: ["route", "title", "info"],
};
</script>

<style></style>
