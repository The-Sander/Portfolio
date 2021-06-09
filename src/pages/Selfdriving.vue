<template>
  <div id="selfdriving" class="project-page">
    <ProjectHero title="Selfdriving car" :img="image" info="JS &amp; Python" />
    <ProjectTemplate :intro="intro" :link="link" :date="date" :role="role" />
    <div class="wrapper">
      <section class="more">
        <h2>More info</h2>
        <div class="content">
          <article>
            <h4>Research and first thoughts</h4>
            <p class="para">
              Our first idea was to use line detection. However we quickly found
              that this was no easy task. Finding the right params and settings
              for our image processing was quite a difficult task. We had
              difficulties with shadows and puddles on the roads and when we
              tweaked the params to be able to find lines in those settings, we
              had too much noise in normal settings. Line detection also depends
              on the roads the car drives on. We started brainstorming again to
              see if we could go another direction. We found some really nice
              self-driving car projects on YouTube and GitHub. Like for instance
              sentdex’s ‘Python Plays: Grand Theft Auto V’ series. He also,
              first tried line detection and switched over to a classifier that
              used game-frames to predict which key to press (WASD). We used the
              same approach (and used some code) from this series to grab our
              game frames. However, we also found a video of a self-driving car
              in GTA V but this time with the use of regression. This model used
              gameframes to predict controller input. We were amazed by the
              result and the smooth driving of this model and got the motivation
              to try to achieve this goal as well.
            </p>
          </article>
          <article>
            <h4>Starting the project</h4>
            <p class="para">
              Our first task was grabbing our controller input and matching this
              with a game frame. We used a library inputs that had a useful
              function get_gamepad which received the gamepad events. Every time
              we received enough information we saved the current game-frame
              with the use of OpenCV and wrote the corresponding controller
              state to a csv file.
            </p>
            <p class="para">
              Once we got this working we wanted to quickly train a model to
              test if it would be worth to go this direction. Since we’re all
              pretty new to the deep learning world and don’t have a lot of
              experience writing models from scratch, our face turned towards
              Fast.ai. There aren’t a lot of tutorials on image regression
              however so we had to browse the fast.ai docs. Here we found that
              we could build our own datablock with 2 different blocks.
              ImageBlock and RegressionBlock. We created our dataloaders and
              trained our model.
            </p>
            <p class="para">
              When we wanted to test our model we saved the trained model as a
              .pth file and loaded it back in. At first we didn’t realize we
              could use a .pkl file but in the end it kind of worked out. The
              use of rebuilding the model and loading the trained .pth file
              resulted in better performance than building the model with a .pkl
              file. I assume (but don’t quote me on this) that rebuilding the
              model resulted in the model using the GPU and using a .pkl file
              resulted in the model using the CPU.
            </p>
            <p class="para">
              The model worked and predicted controller input with the current
              frame. However, since we normalized the data, we had to now
              unnormalize. There are 3 different states the values could be in.
              We have the state we gathered which is a value between -32767 and
              32767, which are left and right respectively. Then we have the
              normalized state we used for training which is a value between 0
              and 1 and we have the state we send to our virtual controller
              which is a value between 0 and 32767. So we had some roadblocks at
              this stage and had to fix some bugs and errors we made with the
              translating of these values over those different states. But in
              the end, the model drove!
            </p>
            <div class="images">
              <figure>
                <img
                  src="https://media.giphy.com/media/c6yOLK7uxPOdE64eyc/giphy-downsized.gif"
                  alt="car that instantly drives of the road"
                />
                <figcaption>first test</figcaption>
              </figure>
              <figure>
                <img
                  src="https://media.giphy.com/media/uNeWj0wYzR7OWVGtRU/giphy-downsized.gif"
                  alt="car that instantly drives of the road in first person perspective"
                />
                <figcaption>
                  Driving to the left due to translating error
                </figcaption>
              </figure>
            </div>
          </article>
          <article>
            <h4>Improving the model</h4>
            <p class="para">
              Since the model drove and we got confirmation that we could go
              this direction we started with gathering more training data. We
              fired up Forza Horizon 4 and started to drive around. We switched
              our perspective and turned on full driving line. This means that
              whenever we placed a waypoint on the map, we had arrows pointing
              us in the direction we had to drive.
            </p>
            <p class="para">
              After we thought we had enough data to test some more, we trained
              the model again but with more images. The model however didn’t
              improve much. So we went back to the drawing board… We quickly
              came to the idea of using Region of Interest and cutting out the
              unnecessary parts of our game. We went back intro Forza and
              gathered new data.
            </p>
            <p class="para">
              After training again, this time with ROI. The model again didn’t
              improve much but we could see the input the model was generating
              and noticed that it wanted to turn to the right directions.
              Controllers have a dead zone in which the car won’t move (from
              about -10k to 10k). So this was another roadblock we had to
              overcome. We also noticed that the car had trouble accelerating.
              The project we were basing ourselves had a fix for this problem,
              namely adding speed into the model’s input data and after the
              convolutions add the speed in the final linear layers.
            </p>
            <p class="para">
              Since this project used tensorflow and we like to know and
              understand what we’re doing we made an attempt to do the same in
              PyTorch. After some tutorials and research we decided not the go
              forth with this idea but instead focus on try to achieve some
              result with the use of fastai. Moving the model to PyTorch is
              something we could add later on.
            </p>
          </article>
          <article>
            <h4>Different input</h4>
            <p class="para">
              In our quest to capture the speed from Forza we stumbled across
              Forza’s UDP system (thanks to a reddit post where we found a video
              and some code3). This is a service Forza games provide in which
              Forza can send data to an endpoint. You could receive a lot of
              information which we don’t have a need for at the moment but would
              be really cool to add to the project later on. For example tire
              slip, wheel rotation, suspension, rpm,… This is why we switched
              our gathering of data over to this UDP instead of gathering
              controller data. To achieve this we had to hook up a WebSocket,
              run a while loop to receive this data on one thread and run a
              while loop to capture game frames on another thread. This was also
              way faster than gathering data from the controller so we could
              capture way more training data in way less time.
            </p>
            <p class="para">
              We started up Forza again and drove around to gather about 20 000
              images with corresponding speed, steering, acceleration and brake.
              We recorded the speed so we could use the same data for when we
              switch over to PyTorch, we don’t use it in the fast.ai model. We
              also turned off the driving line. This driving line might have
              been confusing for our model since we only roughly followed this
              line while gathering data. The driving line is the most optimal
              line to take so it veered off the different lanes on the road to
              get optimal lines for corners. With this new data we trained our
              model again. This time the training took way longer and really
              slowed us down. We translated the model’s output to data we could
              send to our virtual controller namely steering from -127 to 127,
              normalized 0 to 1 and back to 0 to 32k, brake and accel this time
              on different controller axis 0 to 255 normalized 0 to 1 and back
              to 0 to 32k. We also wrote code to overcome the controller dead
              zone since translating the steering back to controller input would
              get unexpected results if we don’t take the dead zone into account
              (low amount of steering would fall into the dead zone).
            </p>
            <p class="para">
              At this point the model didn’t really drive that well and had some
              really rough edges. When the car got off the road it didn’t really
              know how to respond. We came up with an idea. When we take over
              the car we start recording our input and game frames to create
              training data of us fixing the model’s mistakes. We also dove into
              our data and did some data science to figure out if there was any
              bias in our data. The car really favored steering to the left. We
              found out that we had a lot of straights (where steering is 0) and
              took some of these out. The model also pretty much always predicts
              a very low steering value. It didn’t really go less than 0.4 (a
              tiny bit to the left) or bigger than 0.6 (a tiny bit to the
              right). This might be due to the high volume of low-steering
              values in our training data.
            </p>
            <div class="images">
              <figure>
                <img
                  src="https://media.giphy.com/media/KBPM4lZy2N3r613XSo/giphy-downsized.gif"
                  alt="car running into safety barrier"
                />
                <figcaption>Testing with the new data</figcaption>
              </figure>
            </div>
          </article>
          <article>
            <h4>Final thoughts</h4>
            <p class="para">
              This is where we ran out of time for our project deadline. We
              didn’t really get to test out the ‘fixing of the model’s mistakes’
              part of our project but I have no doubt that we will continue
              working even after we have handed in. This project sparked
              interest we didn’t knew we had and got us motivated to research
              and learn more about deep learning and computer vision. We set the
              bar high and even though the car doesn’t drive that well, we’re
              very happy with the results.
            </p>
            <div class="images">
              <figure>
                <img
                  src="https://media.giphy.com/media/9o5qxB3VncnLqZFhO2/giphy-downsized.gif"
                  alt="Virtual controller and game window"
                />
                <figcaption>What it looked like behind the scenes</figcaption>
              </figure>
              <figure>
                <img
                  src="https://media.giphy.com/media/bVmpW12b6Ml0ZjDIAt/giphy-downsized.gif"
                  alt="Car doing a smooth turn"
                />
                <figcaption>Golden moment of our model</figcaption>
              </figure>
            </div>
          </article>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import ProjectHero from "../components/ProjectHero.vue";
import ProjectTemplate from "../components/ProjectTemplate.vue";
import image from "../assets/img/selfdriving.jpg";

export default {
  pageTitle: "Sander Backx - Selfdriving car",
  components: {
    ProjectHero,
    ProjectTemplate,
  },
  data() {
    return {
      image,
      intro:
        "This was a project for my course AI Projects. We had the opportunity to choose between different subjects and my colleagues and I chose to try to create a selfdriving car.",
      link: {
        title: "Code",
        shown: "Github",
        url: "www.github.com",
      },
      date: "November 2020",
      role: [
        "I used Fast.ai image regression. Our data existed of game-frames with corresponding controller input which we recorded while driving around. ",
        "This data we used to teach our model to give controller input when handed a game frame. This result we then gave to a virtual controller which controlled the game.",
      ],
    };
  },
};
</script>

<style></style>
