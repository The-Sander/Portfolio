<template>
  <div id="visualizer" class="project-page">
    <ProjectHero title="Sorting Visualizer" :img="image" info="Javascript" />
    <div class="wrapper">
      <section class="more">
        <div class="container-wrapper">
          <div class="arrayContainer">
            <div class="array-wrapper">
              <div
                class="arrayItem"
                :style="{ height: `${element}px`, width: `${width}px` }"
                v-for="(element, index) in array"
                :key="index"
              ></div>
            </div>
          </div>
        </div>

        <div class="settings">
          <div class="button-wrapper">
            <a class="btn" v-on:click="initArray">New Array</a>
            <a class="btn" v-on:click="mergeSort">Mergesort</a>
            <a class="btn" v-on:click="quickSort">Quicksort</a>
            <a class="btn" v-on:click="heapSort">Heapsort</a>
          </div>

          <div class="input-wrapper">
            <div class="slide-container">
              <div class="label-container">
                <p class="slide-info">Array size</p>
              </div>
              <input
                class="slide"
                type="range"
                v-model="volume"
                @change="checkSize"
                :min="min"
                :max="max"
                label="Change array size"
              />
            </div>
            <div class="input-wrapper">
              <div class="input-container">
                <p class="input-info">Max item size</p>
                <input
                  type="number"
                  @keyup.enter="initArray()"
                  v-model="maxsize"
                  label="Max item size"
                  max="1000"
                />
              </div>
              <div class="input-container">
                <p class="input-info">Speed (ms)</p>

                <input
                  type="number"
                  @keyup.enter="initArray()"
                  v-model="delayInMs"
                  label="Speed in ms"
                  max="5"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import * as sorting from "../assets/js/sorting";
import ProjectHero from "../components/ProjectHero.vue";

export default {
  components: {
    ProjectHero,
  },
  data() {
    return {
      volume: 125,
      min: 30,
      max: 227,
      algorithm: 0,
      array: [],
      length: 200,
      maxsize: 500,
      delayInMs: 2,
      width: 3,
      image: "",
      primary: "#fba754",
      complementary: "#5456fb",
      active: "#fba754",
    };
  },
  created() {
    this.initArray();
  },
  methods: {
    checkSize() {
      if (this.volume > this.array.length) {
        while (this.volume > this.array.length) {
          this.array.push(Math.round(Math.random() * this.maxsize));
        }
      } else if (this.volume < this.array.length) {
        while (this.volume < this.array.length) {
          this.array.pop();
        }
      }
      this.width = Math.floor(400 / this.volume);
    },
    mergeSort() {
      const arr = [...this.array];
      const animations = sorting.getMergeSortAnimations(arr);
      for (let i = 0; i < animations.length; i++) {
        const arrayItems = document.getElementsByClassName("arrayItem");
        const isColorChange = i % 3 !== 2;
        if (isColorChange) {
          const [barOneIdx, barTwoIdx] = animations[i];
          const barOneStyle = arrayItems[barOneIdx].style;
          const barTwoStyle = arrayItems[barTwoIdx].style;
          const color = i % 3 === 0 ? this.active : this.primary;
          setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * this.delayInMs);
        } else {
          setTimeout(() => {
            const [barOneIdx, newHeight] = animations[i];
            const barOneStyle = arrayItems[barOneIdx].style;
            barOneStyle.height = `${newHeight}px`;
          }, i * this.delayInMs);
        }
      }
    },
    quickSort() {
      const arr = [...this.array];
      const animations = sorting.getQuickSortAnimations(arr);
      let comparecount = 0;
      for (let i = 0; i < animations.length; i++) {
        const arrayItems = document.getElementsByClassName("arrayItem");
        if (animations[i].pivot) {
          const barOneIdx = animations[i].pivot;
          const barOneStyle = arrayItems[barOneIdx].style;
          setTimeout(() => {
            barOneStyle.backgroundColor = "green";
          }, i * this.delayInMs);
        }
        if (animations[i].compare) {
          const [barOneIdx, barTwoIdx] = animations[i].compare;
          const barOneStyle = arrayItems[barOneIdx].style;
          const barTwoStyle = arrayItems[barTwoIdx].style;
          const color = comparecount % 2 === 0 ? this.active : this.primary;
          comparecount++;
          setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * this.delayInMs);
        }
        if (animations[i].swap) {
          setTimeout(() => {
            const [barOneIdx, newHeight] = animations[i].swap;
            const barOneStyle = arrayItems[barOneIdx].style;
            barOneStyle.height = `${newHeight}px`;
          }, i * this.delayInMs);
        }
      }
    },
    heapSort() {
      const arr = [...this.array];
      const animations = sorting.getHeapSortAnimations(arr);

      let comparecount = 0;
      for (let i = 0; i < animations.length; i++) {
        const arrayItems = document.getElementsByClassName("arrayItem");
        if (animations[i].compare) {
          const [barOneIdx, barTwoIdx] = animations[i].compare;
          const barOneStyle = arrayItems[barOneIdx].style;
          const barTwoStyle = arrayItems[barTwoIdx].style;
          const color = comparecount % 2 === 0 ? this.active : this.primary;
          comparecount++;
          setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * this.delayInMs);
        }
        if (animations[i].swap) {
          setTimeout(() => {
            const [barOneIdx, newHeight] = animations[i].swap;
            const barOneStyle = arrayItems[barOneIdx].style;
            barOneStyle.height = `${newHeight}px`;
          }, i * this.delayInMs);
        }
      }
    },
    clearArray() {
      this.array = [];
    },
    initArray() {
      this.clearArray();
      for (let i = 0; i < this.volume; i++) {
        this.array.push(Math.round(Math.random() * this.maxsize));
      }
      const arrayItems = document.getElementsByClassName("arrayItem");
      Array.from(arrayItems).forEach((item) => {
        item.style.backgroundColor = this.complementary;
      });
    },
  },
};
</script>
