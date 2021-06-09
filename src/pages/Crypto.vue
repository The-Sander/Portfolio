<template>
  <div id="crypto" class="project-page">
    <ProjectHero title="Trading algorithm" :img="image" info="Typescript" />
    <ProjectTemplate :intro="intro" :link="link" :date="date" :role="role" />
    <div class="wrapper">
      <section class="more">
        <h2>More info</h2>
        <div class="content">
          <article>
            <h4>Connection with Binance</h4>
            <p class="para">
              At the start I used a npm package which sends API requests to the
              Binance API but since this package used callbacks instead of
              promises I rewrote some of this code. I like to work with promises
              instead of callbacks since it is easier to work with 'async await'
              this way. I also had to add some of the newer API endpoints since
              the Binance API is updated reguraly.
            </p>
            <p class="para">
              To get the most accurate trading data I use websockets connected
              to Binance. These websockets send candle data (Open, Close, High,
              Low and Volume) every second. I then use these candle data in the
              strategies.
            </p>
          </article>
          <article>
            <h4>Orders</h4>
            <p class="para">
              Placing an order on Binance is as easy as sending a create order
              request to the API. However managing these orders is the real
              challenge since we aim for full autonomy.
            </p>
            <p class="para">
              Binance provides a seperate websocket for user data. These order
              updates are also send via this websocket. Whenever we create an
              order with an API request we get confirmation with this websocket.
              Instead of checking every second if there are updates on our order
              via the API we can just listen to this websocket and whenever the
              order triggers the websockets sends out an event.
            </p>
            <p class="para">
              It is very important to listen to these events since they have
              information about how much has been bought or sold from your order
              as well as the price, an order id and much more. The handling
              these orders can be placing new orders, cancelling open orders,
              changing the size of orders, moving orders, ...
            </p>
            <p class="para">
              Since strategies change often I tried to split up the project in
              different modules and if you needed a certain modules you would
              just need to plug them in. If you need orders you just have to set
              up the entry price, the stop profit price and the stop price. Once
              you place the entry order, everything else will be handled by this
              order module.
            </p>
          </article>
          <article>
            <h4>Hosting</h4>
            <p class="para">
              Since we want as much up time as possible we need to run this code
              somewhere else than locally. I choose to use a VM on Digital Ocean
              which runs this program.
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
import tradingImg from "../assets/img/trading.jpg";
export default {
  pageTitle: "Sander Backx - Trading algorithm",
  components: {
    ProjectHero,
    ProjectTemplate,
  },
  data() {
    return {
      intro:
        "Two of my friends and I are working on a trading algorithm. My friends are creating a trading strategy and I am developing a program that runs this strategy.",
      link: {
        title: "Code",
        shown: "Github",
        url: "www.github.com",
      },
      date: "April 2020 - Present",
      role: [
        "Converting the strategies to code. Handling everything from incomming trading data to sending out orders.",
        "Automating the whole process so no human intervention is necessary.",
      ],
      image: tradingImg,
    };
  },
};
</script>

<style></style>
