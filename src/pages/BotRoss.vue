<template>
  <div id="botross" class="project-page">
    <ProjectHero title="Bot Ross" :img="image" info="Python &amp; Fast.ai" />
    <ProjectTemplate :intro="intro" :link="link" :date="date" :role="role" />
    <div class="wrapper">
      <section class="more">
        <h2>More info</h2>
        <div class="content">
          <article>
            <h4>Classifier</h4>
            <p class="para">
              We chose to classify the paintings of different painters. First,
              we started with collecting data. To do this we used the Bing Image
              Search API from MS. We used this API because we were already
              familiar with it through the FastAI book. We also tried the Google
              Image Search API, but we had worse results, so we went back to the
              Bing API.
            </p>
            <p class="para">
              When we first put our paintings trough a resnet34 we got an
              accuracy of 80% which is not bad, but we can do better so we
              improved our model. This is when we started using weighted classes
              because there is not an equal number of paintings of every
              painter. So, the model was biased towards painters with a lot of
              paintings. Weighted classes are used to change the weight of each
              class. Classes (painters in our case) with less data get a higher
              weight and classes with a lot of data get a lower weight so the
              model is not as biased.
            </p>
            <div class="img-wrapper">
              <figure>
                <img src="../assets/img/botross/matrix1.jpg" alt="" />
              </figure>
            </div>
            <p class="para">
              Then we put our data through a resnet50. This got out accuracy up
              to 85%. We can’t blame our model too much for some wrong
              classifications because sometimes the paintings of 2 painters are
              almost identical.
            </p>
            <div class="img-wrapper">
              <figure>
                <img src="../assets/img/botross/matrix2.jpg" alt="" />
              </figure>
            </div>
          </article>
          <article>
            <h4>Neural Style Transfer</h4>
            <p class="para">
              We chose to make a NST as an extension on our project. The
              principle behind NST is simple, you have two images. One which
              content you want to show and one which style you want to use. Then
              we define two distances, one for the content (Dc) and one for the
              style (Ds). Dc measures how different the content is between the
              two images while Ds measures how different the style is between
              the two images. Then we take a third image, the input, and
              transform it to minimize both its content-distance with the
              content-image and the style distance with the style-image.
            </p>
            <p class="para">
              Most of the code comes from a
              <a
                href="https://pytorch.org/tutorials/advanced/neural_style_tutorial.html"
                target="_blank"
                >tutorial from PyTorch</a
              >. We changed how the input images get loaded because this model
              expected that every image was the same size, this isn’t the case
              when you get ‘random’ data from the internet.
            </p>
          </article>
          <article>
            <h4>Deploying the model</h4>
            <p class="para">
              First, we tried deploying our model on GCP trough the app engine.
              Every time we deployed our app, we got an error that it ran out of
              memory. We spend two days trying to fix this (we tried changing
              the memory from 256Mb to 1Gb to 2Gb), but we kept getting the same
              error. This is when we decided to deploy it in
              <a href="http://128.199.63.207:5000/" target="_blank"
                >a VM on DigitalOcean where we installed Nginx</a
              >.
            </p>
          </article>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import ProjectHero from "../components/ProjectHero.vue";
import ProjectTemplate from "../components/ProjectTemplate.vue";
import botrossImg from "../assets/img/lion.jpg";

export default {
  pageTitle: "Sander Backx - Bot Ross",

  components: {
    ProjectHero,
    ProjectTemplate,
  },
  data() {
    return {
      intro:
        "This was a project for my course Big Data. We were tasked to create an image classifier. We chose to classify paintings and painters.",
      link: {
        title: "Code",
        shown: "Github",
        url: "https://github.com/YoriVerbist/Bot-Ross",
      },
      date: "November 2020",
      role: [
        "During this project I worked together with my colleague to create an image classifier using Fast.ai. We used Bing api to retreive images from the web which we used for training. Given an image, our model predicts which painter painted the image.",
        "As an extension we added NST (Neural Style Transfer) that combines an image and a painting style to create a new image. Sadly, this process takes too long to do on the web.",
      ],
      image: botrossImg,
    };
  },
};
</script>

<style></style>
