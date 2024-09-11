import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: 'AIzaSyCI27wpyWFuIQE9cNB1HdBy4xLd9-YnIW4',
  authDomain: 'xtan-library.firebaseapp.com',
  projectId: 'xtan-library',
  storageBucket: 'xtan-library.appspot.com',
  messagingSenderId: '268128752652',
  appId: '1:268128752652:web:7a3d3cc1ecdd8c41f14a29',
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore();
export default db;