<template>
  <router-link :to="route" class="work" v-if="onsite">
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
  <a v-else :href="route" target="_blank" class="work">
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
  </a>
</template>

<script>
export default {
  props: ["route", "title", "info", "onsite"],
};
</script>

<style></style>
