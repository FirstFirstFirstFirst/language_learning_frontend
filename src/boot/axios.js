// axios.js
import { boot } from "quasar/wrappers";
import axios from "axios";

const RESTAPI = "http://localhost:3000/api";
// const RESTAPI = "https://language-learning-backend-rosy.vercel.app/api";

const api = axios.create({
  baseURL: RESTAPI,
  headers: { "Content-Type": "application/json" },
});

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
  app.config.globalProperties.$RESTAPI = RESTAPI;
});

export { api, RESTAPI };
