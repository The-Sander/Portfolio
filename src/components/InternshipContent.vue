<template>
  <div class="internship-content">
    <div class="grid">
      <div class="wrapper">
        <section class="intro">
          <div class="content">
            <p class="big">Can an AI play Rummikub?</p>
            <p class="para">
              To answer this question we need a few things. First, we need
              computer vision to predict the game state from images. Then we
              need an algorithm that can predict optimal moves from a game state
              and finally, we need these 2 solutions to work together to solve
              Rummikub.
            </p>
            <p class="para">
              I used the official Rummikub app to play the game and OpenCV to
              process images.
            </p>

            <p class="para">
              Thank you
              <a
                href="https://arinti.ai/"
                target="_blank"
                class="internship-link"
                >Arinti</a
              >
              for the amazing internship. It was a great experience and I
              learned a lot.
            </p>
          </div>
          <div class="images">
            <div class="img img-1">
              <img
                src="https://www.johnadams.co.uk/wp-content/uploads/2021/01/Rummikub-Logo.png"
                alt=""
              />
            </div>
            <div class="img img-2">
              <img src="../assets/img/joker.png" alt="" />
            </div>
            <div class="img img-3">
              <img src="../assets/img/arinti-logo.png" alt="" />
            </div>
          </div>
        </section>
      </div>
      <div class="bg-offwhite">
        <div class="wrapper">
          <section class="steps">
            <div class="step">
              <img src="../assets/img/internship/getting.jpg" alt="" />
              <div class="content step-1 left">
                <p class="big">Getting images</p>
                <p class="para">
                  To get the images from the Rummikub app I used a library
                  called "Pillow". With this library you can use "ImageGrab" to
                  grab a section of your screen.
                </p>
              </div>
            </div>
            <div class="step">
              <div class="content step-2 right">
                <p class="big">Process image</p>
                <p class="para">
                  Using OpenCV to create filters I can filter out parts of the
                  image and create contours. I use these contours to extract the
                  sections of blocks and the blocks themselves.
                  <br /><br />When I have extracted blocks I can start preparing
                  for the prediction.
                </p>
              </div>
              <img src="../assets/img/internship/process.jpg" alt="" />
            </div>

            <div class="step">
              <img src="../assets/img/internship/predict.jpg" alt="" />
              <div class="content step-3 left">
                <p class="big">Predict</p>
                <p class="para">
                  When predicting I look at one block at a time. I then use a
                  region of interest to only leave the digit and not the whole
                  block. I then do two different predictions, one for the digit
                  and one for the color.
                  <br /><br />
                  To predict the digit I convert the region of interest to a
                  binary image. This binary image I then turn into an array
                  which is given to a K-Nearest Neighbors algorithm. This
                  algorithm predicts a digit between 0 and 13 with 0 being the
                  joker.
                  <br /><br />
                  To predict the color I convert the region of interest into an
                  array and give this array to a K-Means algorith. This
                  algorithm will return me two different RGB values. One of
                  these is the background of the block and the other is the
                  actual color. I set up some thresholds which define what RGB
                  values belong to certain labels so when I receive a RGB value
                  from the algorithm I can determine what color the value is.

                  <br /><br />
                  When I have predicted all the blocks on the board I can start
                  reconstructing the board. The earlier retreived sections can
                  now be used to group the predictions together. When I have
                  gathered all this information I can use the information in a
                  game algorithm.
                </p>
              </div>
            </div>
            <div class="step">
              <div class="content step-4 right">
                <p class="big">Algorithm</p>
                <p class="para">
                  I use Monte Carlo Tree Search to predict the next move. Monte
                  Carlo Tree Search is an algorithm that simulates game states,
                  gives these simulations a score and picks the best simulation.
                  <br /><br />
                  The algorithm looks at which blocks are on the board and which
                  blocks are in the player’s hand. After this it will try to
                  find all possible moves to be made. When these are found the
                  algorithm makes one of these moves and simulates again with
                  the newfound board. After the algorithm can no longer make
                  moves or if a winner is found the algorithm uses a value
                  function to see if this set of actions was a good set of
                  actions. The value function first looks if there is a winner.
                  If the player wins the reward function will return 100. If
                  there is no winner, the reward function will return the number
                  of moves made + 0.5 and if the other player wins the reward
                  function will return 0. In the end the algorithm will return
                  the most profitable instruction to the player.
                </p>
              </div>
              <img src="../assets/img/internship/mcts.jpg" alt="" />
            </div>

            <!-- <div class="step-caroussel">
              <Carrousel />
            </div> -->
          </section>
        </div>
      </div>
      <div class="wrapper">
        <section class="action">
          <p class="big">Watch the program in action</p>
          <div class="video-wrapper">
            <div class="embed-vid">
              <iframe
                src="https://www.youtube.com/embed/FaGeOhMGcKM"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                class="youtube-video"
              ></iframe>
            </div>
          </div>
        </section>
      </div>
      <div class="wrapper">
        <div class="buttons">
          <a href="../assets/doc/action_plan.pdf" target="_blank" class="button"
            >Action plan</a
          >
          <a href="../assets/doc/realization.pdf" target="_blank" class="button"
            >Realisation document</a
          >
          <a href="../assets/doc/reflection.pdf" target="_blank" class="button"
            >Reflection document</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Carrousel from "./Carrousel.vue";

export default {
  components: {
    Carrousel,
  },
};
</script>

<style></style>
