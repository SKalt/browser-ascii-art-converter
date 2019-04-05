import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import { DEFAULT_RAMP } from "./lib";
import store from "./store/index";
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    }
  ]
});

interface StrDict {
  [key: string]: string;
}

const stringify = (obj: object): StrDict =>
  Object.entries(obj).reduce(
    (acc, [key, value]) => ({ ...acc, ...{ [key]: `${value}` } }),
    {}
  );

interface StringConfig {
  // all the keys of config, str values
  raw: string;
  width: string | number;
  height: string | number;
  grayramp: string;
}

interface NameUpdate extends StringConfig {
  name?: string;
}

function mergeQuery(query: StringConfig) {
  return { ...router.currentRoute.query, ...query };
}

function makeName(name: string = "___") {
  name = name || "___";
  name = name.length > 9 ? name.slice(0, 10) + "…" : name;
  return `art(${name})`;
}

function makeNext(
  type: "push" | "replace",
  { name = "___", ...cfg }: NameUpdate
) {
  document.title = makeName(name);
  router[type]({ path: "/", query: stringify(mergeQuery(cfg)) });
}

export function push(args: NameUpdate) {
  return makeNext("push", args);
}

export function replace(args: NameUpdate) {
  return makeNext("replace", args);
}

export default router;
