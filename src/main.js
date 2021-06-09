import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/style.scss";
const app = createApp(App);

function getTitle(vm) {
  const { pageTitle } = vm.$options;
  if (pageTitle) {
    return typeof pageTitle === "function" ? pageTitle.call(vm) : pageTitle;
  }
}

export default {};

app.mixin({
  mounted() {
    const title = getTitle(this);
    if (title) {
      document.title = title;
    }
  },
});
app.use(router);
app.mount("#hook");
