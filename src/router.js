import { createWebHistory, createRouter } from "vue-router";

import SearchView from './components/views/SearchView.vue'
import HomeView from './components/views/HomeView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/search', component: SearchView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router