<template>
  <div class="about-content">
    <div class="grid">
      <div class="wrapper">
        <section class="intro">
          <p class="big">
            I am a 23 year old web developer and teacher who studied Applied Computer Science at Thomas More
            Geel.
          </p>
          <p class="para">
            During my web development job I work on existing websites and applications as well as creating websites and applications from scratch. My speciality is working with VueJS.
            I also work at Thomas More Geel where I teach Data Modeling, Data Analysis and Agile.
          </p>
          <p class="para">
            During my spare time I love to code. I'm always learning new things
            and currently I am very enthousiastic about Blockchain technologies.
          </p>
          <p class="para">
            I love building things from the ground up. Starting with an empty
            file, slowly adding more and more stuff and seeing the project grow
            is what I love about coding.
          </p>
          <p class="para">
            When I am not coding, I am producing music. I am passionate about
            music and you will rarely find me without music playing in my ears.
          </p>
          <img src="../assets/img/foto.jpg" alt />
        </section>
      </div>
      <div class="wrapper">
        <section class="tools two-cols">
          <h2>
            <span class="line">Techs</span>
            <span class="line">&amp; Tools</span>
          </h2>
          <div class="content">
            <span v-for="(tool, i) in toolsTechs" v-bind:key="i">{{ tool }}</span>
          </div>
        </section>
      </div>
      <div class="wrapper">
        <section class="hackathons two-cols">
          <h2>Hackathons</h2>
          <div class="content">
            <span class="full-line">Winner Hack The Future NLP 2019</span>
            <span class="full-line">4th place Hack The Future NLP 2020</span>
            <span class="full-line">5th place AtOnce Hackathon 2019</span>
          </div>
        </section>
      </div>
      <div class="wrapper">
        <div class="buttons">
          <a
            href="../assets/doc/CV_Backx_Sander_English_Portfolio.pdf"
            target="_blank"
            class="button"
          >Resume</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      toolsTechs: [
        "JS, ES6",
        "Python",
        "Typescript",
        "HTML",
        "CSS, SCSS",
        "VueJS",
        "ReactJS",
        "NodeJS",
        "ExpressJS",
        "Firebase",
        "MongoDB",
        "Fast.ai",
        "Jupyter notebook",
        "Figma",
        "Solidity",
      ],
    };
  },
};
</script>

<style></style>
