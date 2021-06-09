<template>
  <div class="carrousel">
    <div class="carrousel-content">
      <div class="carrousel-circles">
        <a class="carrousel-button circle" v-on:click="showPrev">
          <span>&lt;</span></a
        >
        <a
          class="circle"
          :class="i == shown ? 'active' : ''"
          v-for="(item, i) in content"
          :key="i"
          v-on:click="() => goTo(i)"
        >
          <span>{{ i + 1 }}</span>
        </a>
        <a class="carrousel-button circle" v-on:click="showNext"
          ><span>&gt;</span></a
        >
      </div>
      <div class="item-wrapper">
        <div
          class="carrousel-item"
          :class="i == shown ? 'shown' : 'hidden'"
          v-for="(item, i) in content"
          v-bind:key="i"
        >
          <h4>{{ title[i] }}</h4>
          <p class="para">
            {{ item }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: ["Getting images", "Title 2", "Title 3"],
      content: ["Content 1", "Content 2", "Content 3 "],
      shown: 0,
    };
  },
  methods: {
    showPrev() {
      this.shown = this.shown == 0 ? this.content.length - 1 : this.shown - 1;
    },
    showNext() {
      this.shown++;
      this.shown %= this.content.length;
    },
    goTo(i) {
      this.shown = i;
    },
  },
};
</script>

<style></style>
