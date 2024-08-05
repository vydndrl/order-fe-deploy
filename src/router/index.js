import { createRouter, createWebHistory } from "vue-router";
// @는 src(루트 폴더 경로)를 의미
// 파일 내부에 export default가 있는 경우에는 {}가 필요없고, 그렇지 않으면 {} 필요
// 요소가 여러개 있을 때에도 {}를 붙인다.
import HomeComponent from "@/components/HomeComponent.vue";
// import TestComponent from "@/components/TestComponent.vue";

import { practiceRouter } from "./practiceRouter";
import { memberRouter } from "./memberRouter";
const routes = [
  {
    // path로도 라우팅이 가능하고, name으로도 라우팅이 가능
    // name으로 라우팅하는 경우는, js 코드내에서 라우팅 하는 경우
    path: "/",
    name: "HomeComponent",
    component: HomeComponent,
  },
  // {
  //     path: "/test",
  //     name: "TEST",
  //     component: TestComponent,
  //   },

  ...practiceRouter,
  ...memberRouter,
];

const router = createRouter({
  // vue router는 내부적으로 두가지 방식의 히스토리 관리를 제공
  // 1) createWebHistory : /home, 2) createHashHistroy : /#/home
  // 대부분 webHistory 사용
  history: createWebHistory(),
  routes,
});

export default router;
