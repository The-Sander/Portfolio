<template>
  <div id="project4" class="project-page">
    <ProjectHero
      title="Project 4.0"
      :img="image"
      info="Typescript &amp; Python"
    />
    <ProjectTemplate :intro="intro" :link="link" :date="date" :role="role" />
    <div class="wrapper">
      <section class="more">
        <h2>More info</h2>
        <div class="content">
          <article>
            <h4>Research</h4>
            <p class="para">
              Our team was tasked to do extensive research on the topic. Ranging
              from market analysis to what technologies we wanted to use. This
              research was done over the course of three months whereafter we
              presented our conclusions to VanRoey.be.
            </p>
          </article>
          <article>
            <h4>Database</h4>
            <p class="para">
              We put a lot of time and effort into building a suitable database
              solution for this project. This was not an easy task since this
              database has to have scalability in mind.
            </p>
            <p class="para">
              We also focussed on customizability for the end users. Users can
              create their own roles, their own tags, own machines, ... There
              are not many things set in stone.
            </p>
            <div class="images">
              <figure>
                <img
                  src="../assets/img/project4/database.jpg"
                  alt="car that instantly drives of the road"
                />
                <figcaption>Data model</figcaption>
              </figure>
            </div>
          </article>

          <article>
            <h4>Back end</h4>
            <p class="para">
              The back end is NodeJS with Express written in Typescript. I first
              started with Javascript but switched over to Typescript once the
              project reached a size where explicit types where needed for
              readability and bug prevention.
            </p>
            <p class="para">
              While working on the back end I often had to refactor older code
              after I added new features. For example adding middlewhare to the
              routes after I implemented user authentication. Then adding JWT
              tokens and again rewriting some of the middlewhare.
            </p>
            <p class="para">
              I worked close together with a member of my team who developed the
              front end websites. He often requested a certain endpoint to be
              made or a certain setting to be enabled.
            </p>
          </article>
          <article>
            <h4>Machine</h4>
            <p class="para">
              The machine has a Raspberry Pi running python code. The machine
              does not have any connection to the database and has no knowledge
              of users. The python code only communicates with the back end.
            </p>
            <p class="para">
              When an user requests a QR code on the website. The back end
              registers a new order and saves this order to the database. If a
              user walks up to a machine and scans their QR code, the machine
              will send a request to the back end which includes the QR code.
              The back end will check if there is such a QR code in the database
              and if there is, it checks the users limitations and sends and OK
              to the python code. The python code will then check behind which
              door there still is product and open one of these locks. When the
              user takes product, the python code again sends a 'completed'
              update to the back end. The back end updates the users information
              and saves the request to the history in the database.
            </p>
            <p class="para">
              While all this is going on, the machine will show personlized
              messages to the user on a screen. These messages can be changed in
              the admin panel. For instance, the admin can create a message like
              '{firstname} {lastname} welcome to Thomas More'. The {firstname}
              and {lastname} will then be replaced by the validated user's first
              and lastname.
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
import project4Img from "../assets/img/project4.jpg";
export default {
  pageTitle: "Sander Backx - Project 4.0",

  components: {
    ProjectHero,
    ProjectTemplate,
  },
  data() {
    return {
      intro: `Four colleagues and I build a smart dispensing machine which can be managed by an admin panel. 
        Users can request a QR code from a website. The machine can scan this QR code, give the user personalized messages and open one of the locks.`,
      link: {
        title: "Video",
        shown: "Youtube",
        url: "https://youtu.be/orC074SIFBo",
      },
      date: "February 2021",
      role: [
        "Building the back end system. Ranging from adding new machines to user authentication. Build with Node/Express in Typescript with a MongoDB database.",
        "I also helped with the Python code to scan the QR code, sending requests to the back end, showing personlized messages and the opening and closing of the locks.",
      ],
      image: project4Img,
    };
  },
};
</script>

<style></style>
