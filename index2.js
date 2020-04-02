import { visualia } from "./dist/visualia.js";
import { createApp } from "./src/deps/vue.js";
import {
  createWebHistory,
  createRouter,
  Link,
  View,
  useRoute,
  useRouter
} from "./src/deps/vue-router.js";

const Sample = {
  setup(props) {
    const a = useRoute();
    return { a };
  },
  template: `<pre>{{ a }}</pre><a id="b" href="#b">#b</a><pre>{{ a }}</pre>`
};

const history = createWebHistory();

const routes = [
  { path: "/a/:bla", component: Sample },
  { path: "/home", redirect: "/", component: Sample },
  { path: "/", component: Sample }
];

const scrollBehavior = to => {
  if (to.hash) {
    console.log(to.hash);
    return {
      selector: to.hash
    };
  }
};

const router = createRouter({
  history,
  routes,
  scrollBehavior
});

const template = `
<router-link to="/">root</router-link>
<br><router-link to="/a/hey#b">a/hey</router-link>
<br><router-view />`;

visualia({
  components: { VLink: Link, VView: View },
  template,
  use: { router }
});

// const app = createApp({
//   components: { Link, View },
//   template
// });
// app.use(router);
// app.mount("#app");
