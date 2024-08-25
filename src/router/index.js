import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../Views/HomeView.vue'
import AboutView from '../Views/AboutView.vue'
import LoginView from '../Views/LoginView.vue'
import AccessDeniedView from '../Views/AccessDeniedView.vue'
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
    component: AboutView,
    meta: { requiresAuth: true } 
  },

  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },

  { 
    path: '/access-denied', 
    name: 'AccessDenied', 
    component: AccessDeniedView 
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'AccessDenied' })
  } else {
    next()
  }
})

export default router