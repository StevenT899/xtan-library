import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../Views/HomeView.vue'
import AboutView from '../Views/AboutView.vue'
import LoginView from '../Views/LoginView.vue'
import AccessDeniedView from '../Views/AccessDeniedView.vue'
import FireBaseSigninView from '../Views/FireBaseSigninView.vue'
import FireBaseRegisterView from '../Views/FireBaseRegisterView.vue'
import AdminView from '../Views/AdminView.vue'
import AddBookView from '@/Views/AddBookView.vue'
import BookListView from '@/Views/BookListView.vue'
import GetBookCountView from '@/Views/GetBookCountView.vue'
import WeatherView from '@/Views/WeatherView.vue'
import CountBookAPI from '@/Views/CountBookAPI.vue'
import GetAllBookAPI from '@/Views/GetAllBookAPI.vue'



const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
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
  },

  { 
    path: '/FireLogin', 
    name: 'FireLogin', 
    component: FireBaseSigninView 
  },

  { 
    path: '/FireRegister', 
    name: 'FireRegister', 
    component: FireBaseRegisterView 
  },

  { 
    path: '/Admin', 
    name: 'Admin', 
    component: AdminView 
  },

  { 
    path: '/AddBook', 
    name: 'AddBook', 
    component: AddBookView 
  },

  { 
    path: '/BookList', 
    name: 'BookList', 
    component: BookListView 
  },

  { 
    path: '/GetBookCount', 
    name: 'GetBookCount', 
    component: GetBookCountView
  },

  { 
    path: '/weather', 
    name: 'WeatherView', 
    component: WeatherView
  },

  { 
    path: '/countBookAPI', 
    name: 'CountBookAPI', 
    component: CountBookAPI
  },

  { 
    path: '/getAllBookAPI', 
    name: 'GetAllBookAPI', 
    component: GetAllBookAPI
  },

]

const router = createRouter({
  history: createWebHistory(import.meta.env.VUE_APP_BASE_URL),
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