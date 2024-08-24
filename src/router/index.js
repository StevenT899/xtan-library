import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../Views/HomeView.vue'
import AboutView from '../Views/AboutView.vue'
import  RegistrationForm  from '../components/LibraryRegistrationForm.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: RegistrationForm
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router