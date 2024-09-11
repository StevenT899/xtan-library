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