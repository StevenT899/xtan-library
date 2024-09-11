<template>
  <h1>Sign In</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>

  <label>
    <input type="radio" value="user" v-model="role" />
    User
  </label>
  <label style="margin-left:5px">
    <input type="radio" value="admin" v-model="role" />
    Admin
  </label>

  <p style="margin-top:5px"><button @click="signin">Sign In via Firebase</button></p>
</template>

<script setup>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const role = ref('user'); 
const router = useRouter();
const auth = getAuth();
const db = getFirestore();

const signin = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);

    const user = userCredential.user;

    const userDoc = await getDoc(doc(db, role.value === 'user' ? 'users' : 'admins', user.uid));

    if (userDoc.exists()) {
      const userData = userDoc.data();
      if (userData.role === 'admin') {
        console.log(auth.currentUser);
        router.push('/Admin');
      } else {
        console.log(auth.currentUser);
        router.push('/');
      }
    } else {
      console.log('User data not found in Firestore');
    }
  } catch (error) {
    console.log(error.code);
  }
};
</script>
