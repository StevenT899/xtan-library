  <template>
    <h1>Create an Account</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <div>
      <label>
        <input type="radio" value="user" v-model="role" />
        User
      </label>
      <label style="margin-left:5px">
        <input type="radio" value="admin" v-model="role" />
        Admin
      </label>
    </div>
    <div v-if="isAdmin">
      <p><input type="password" placeholder="Admin Password" v-model="adminKey" /></p>
    </div>
    <p><button @click="register">Save to Firebase</button></p>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
  import { useRouter } from 'vue-router';
  import { getFirestore, doc, setDoc } from 'firebase/firestore';
  
  const email = ref('');
  const password = ref('');
  const adminKey = ref('');
  const validateAdmin = ref('admin7788') 
  const role = ref('user');
  const router = useRouter();
  const auth = getAuth();
  const db = getFirestore();
  

  const isAdmin = computed(() => role.value === 'admin');
  
  const register = async () => {
    if (isAdmin.value && adminKey.value !== validateAdmin.value) {
      console.log('Invalid, you have no permission to register as administrator');
      return;
    }
  
    try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
    console.log('Firebase Register successful!');
    const user = userCredential.user;
    const collectionName = role.value === 'user' ? 'users' : 'admins';
    await setDoc(doc(db, collectionName, user.uid), {
      email: user.email,
      role: role.value 
    });

    router.push('/FireLogin');
  } catch (error) {
    console.log(error.code);
  }
  };
  </script>
  