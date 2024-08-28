<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="username">Username</label>
        <input 
          type="text" 
          id="username" 
          @blur="() => validateName(true)"
          @input="() => validateName(false)" 
          v-model="formData.username"
        />
        <p v-if="errors.username" class="error">{{ errors.username }}</p>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input 
          type="password" 
          id="password" 
          @blur="() => validatePassword(true)"
          @input="() => validatePassword(false)" 
          v-model="formData.password" 
        />
        <p v-if="errors.password" class="error">{{ errors.password }}</p>
      </div>
      <button type="submit">Login</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const formData = ref({
  username: '',
  password: ''
})

const errors = ref({
  username: null,
  password: null
})

const errorMessage = ref('')

const validateName = (blur) => {
  if (formData.value.username.length < 3) {
    if (blur) errors.value.username = 'Name must be at least 3 characters'
  } else {
    errors.value.username = null
  }
}

const validatePassword = (blur) => {
  const password = formData.value.password
  const minLength = 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (password.length < minLength) {
    if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`
  } else if (!hasUppercase) {
    if (blur) errors.value.password = 'Password must contain at least one uppercase letter.'
  } else if (!hasLowercase) {
    if (blur) errors.value.password = 'Password must contain at least one lowercase letter.'
  } else if (!hasNumber) {
    if (blur) errors.value.password = 'Password must contain at least one number.'
  } else if (!hasSpecialChar) {
    if (blur) errors.value.password = 'Password must contain at least one special character.'
  } else {
    errors.value.password = null
  }
}

const login = () => {
  validateName(true)
  validatePassword(true)
  
  if (!errors.value.username && !errors.value.password) {
    if (formData.value.username === 'admin' && formData.value.password === 'Password12,.') {
      localStorage.setItem('isAuthenticated', 'true')
      router.push({ name: 'About' })
    } 
    else {
      router.push('/access-denied')
    }
  } 
}
</script>

<style scoped>
.error {
  color: red;
}
</style>
