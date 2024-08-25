<template>
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">Username</label>
          <input v-model="username" type="text" id="username" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input v-model="password" type="password" id="password" required />
        </div>
        <button type="submit">Login</button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const username = ref('')
  const password = ref('')
  const errorMessage = ref('')
 
  
  const login = () => {
    
    if (username.value === 'admin' && password.value === 'password') {
      localStorage.setItem('isAuthenticated', 'true')
      router.push({ name: 'About' })
    } else {
      errorMessage.value = 'Login failed'
    }
  }
  </script>
  
  <style scoped>

  </style>
  