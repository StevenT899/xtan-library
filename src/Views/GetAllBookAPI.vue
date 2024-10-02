<template>
    <div>
      <h1>Get All Books</h1>
      <ul>
        <li v-for="book in books" :key="book.id">
          {{ book.name }} - ISBN: {{ book.isbn }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { collection, getDocs } from 'firebase/firestore';
  import db from '../firebase/init.js';
  
  export default {
    setup() {
      const books = ref([]);
  
      const getAllBooksAPI = async () => {
        try {
          const booksCollection = collection(db, 'books');
          const querySnapshot = await getDocs(booksCollection);
          const booksArray = [];
          querySnapshot.forEach((doc) => {
            booksArray.push({ id: doc.id, ...doc.data() });
          });
          books.value = booksArray;
        } catch (error) {
          console.error('Error fetching books:', error);
        }
      };
  
      onMounted(() => {
        getAllBooksAPI();
      });
  
      return {
        books,
      };
    },
  };
  </script>
  