<template>
  <div class="hero hero-project">
    <div class="wrapper">
      <div class="hero-content">
        <h4>{{ info }}</h4>
        <h1>
          <span class="line" v-for="(line, i) in title.split(' ')" :key="i">{{
            line
          }}</span>
        </h1>
        <div class="thumb">
          <img :src="img" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "img", "info"],
};
</script>

<style></style>
