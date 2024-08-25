<template>
    <div>
      <button @click="logout">Log Out</button>
      
      <div class="text-center">
        <h1>About Our Library</h1>
        <p>Welcome to our digital library! We're dedicated to providing a vast collection of books and resources to our community.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter() 
  
  const isAuthenticated = ref(localStorage.getItem('isAuthenticated') === 'true')
  
  const logout = () => {
    localStorage.removeItem('isAuthenticated')
    router.push({ name: 'Login' })
  }
  </script>
  
  <style>

  </style>
  