<template>
  <div id="genalgo" class="project-page">
    <ProjectHero title="Genetic Algorithm" :img="image" info="Javascript" />
    <div class="wrapper">
      <section class="more">
        <div class="canvas-wrapper">
          <canvas width="750" height="750" ref="canvas"></canvas>
          <p class="canvas-text">Current generation: {{ generation }}</p>
        </div>
        <div class="settings">
          <div class="button-wrapper">
            <div class="buttons" v-if="!started">
              <a class="btn" v-on:click="start()">Start</a>
            </div>
            <div class="buttons" v-else>
              <a class="btn" v-if="run" v-on:click="stop()">stop</a>
              <div class="two-buttons" v-else>
                <a class="btn" v-on:click="resume()">resume</a>
                <a class="btn" v-on:click="reset()">reset</a>
              </div>
            </div>
          </div>
          <div class="slide-container">
            <div class="slide-content">
              <p class="slide-info">Max steps</p>
              <input
                type="range"
                min="50"
                max="500"
                class="slider"
                @change="checkSteps"
                v-model="maxsteps"
              />
            </div>
          </div>
          <div class="slide-container">
            <div class="slide-content">
              <p class="slide-info">Obstacles amount</p>
              <input
                type="range"
                min="1"
                max="50"
                class="slider"
                @change="checkObstacles"
                v-model="obstaclesAmount"
              />
            </div>
          </div>
          <div class="input-container">
            <div class="input-content">
              <p class="input-info">Mutation frequency</p>
              <input
                type="number"
                @change="changeMutationfreq()"
                @keyup.enter="changeMutationfreq()"
                v-model="mutation"
                step="0.01"
                min="0"
              />
            </div>
          </div>
          <div class="reference-container">
            <div class="reference">
              <p>
                References:
                <a href="https://www.youtube.com/watch?v=BOZfhUcNiqk"
                  >Code Bullet Youtube video</a
                >
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Population from "../assets/js/GeneticAlgorithm/population";
import Goal from "../assets/js/GeneticAlgorithm/goal";
import Obstacles from "../assets/js/GeneticAlgorithm/obstacles";
import ProjectHero from "../components/ProjectHero.vue";
import ProjectTemplate from "../components/ProjectTemplate.vue";

export default {
  components: {
    ProjectHero,
    ProjectTemplate,
  },
  data() {
    return {
      canvas: null,
      ctx: null,
      popSize: 250,
      population: null,
      goal: null,
      obstaclesAmount: 5,
      maxsteps: 400,
      obstacles: null,
      run: true,
      generation: 0,
      started: false,
      mutation: 0.01,

      intro:
        "This was a side project where I created a genetic algorithm in javascript.",
      link: {
        title: "",
        shown: "",
        url: "",
      },
      date: "October 2020",
      role: [
        "During this project I worked together with my colleague to create an image classifier using Fast.ai. We used Bing api to retreive images from the web which we used for training. Given an image, our model predicts which painter painted the image.",
        "",
      ],
      image: "",
    };
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    this.ctx = this.canvas.getContext("2d");
  },
  methods: {
    stop() {
      this.run = false;
    },
    reset() {
      this.started = false;
      this.generation = 0;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    start() {
      this.run = true;
      this.started = true;
      this.generation = 1;
      this.population = new Population(this.popSize);
      this.goal = new Goal({ x: 350, y: 700 });
      this.obstacles = new Obstacles(this.obstaclesAmount);
      this.update();
    },
    resume() {
      this.run = true;
      this.update();
    },
    update() {
      if (!this.run) return;
      requestAnimationFrame(this.update);
      if (this.population.allDotsDead()) {
        this.population.calculateFitness(this.goal.getPos());
        this.population.naturalSelection();
        this.population.mutate();
        this.generation = this.population.generation;
      }
      this.population.update(
        { x: this.canvas.width, y: this.canvas.height },
        this.goal.getPos(),
        this.obstacles
      );
      this.draw();
    },
    draw() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.goal.draw(this.ctx);
      this.population.draw(this.ctx);
      this.obstacles.draw(this.ctx);
    },
    checkObstacles() {
      if (this.obstacles) {
        this.obstacles.addRemoveObjects(this.obstaclesAmount);
      }
    },
    checkSteps() {
      if (this.population) {
        this.population.checkSteps(this.maxsteps);
      }
    },
    changeMutationfreq() {
      if (this.population) {
        this.population.changeMutationfreq(this.mutation);
      }
    },
  },
};
</script>

<style></style>
