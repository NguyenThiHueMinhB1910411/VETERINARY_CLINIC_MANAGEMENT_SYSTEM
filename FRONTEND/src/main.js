import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
const pinia = createPinia();
const app = createApp(App);
app.use(app);
app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(pinia);
app.mount("#app");
