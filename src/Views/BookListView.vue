<template>
  <div>
    <h1>Books with ISBN > 1000</h1>
    <ul>
      <li v-for="book in books" :key="book.id">
        {{ book.name }} - ISBN: {{ book.isbn }}
        <button @click="editBook(book)">Edit</button>
        <button @click="deleteBook(book.id)">Delete</button>
      </li>
    </ul>
    <div v-if="editingBook">
      <h2>Edit Book</h2>
      <form @submit.prevent="updateBook">
        <div>
          <label for="editName">Name:</label>
          <input type="text" v-model="editingBook.name" id="editName" required />
        </div>
        <div>
          <label for="editIsbn">ISBN:</label>
          <input type="number" v-model="editingBook.isbn" id="editIsbn" required />
        </div>
        <button type="submit">Update Book</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { collection, query, where, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import db from '../firebase/init.js';

export default {
  setup() {
    const books = ref([]);
    const editingBook = ref(null);

    const fetchBooks = async () => {
      try {
        const q = query(collection(db, 'books'), where('isbn', '>', 1000));
        const querySnapshot = await getDocs(q);
        const booksArray = [];
        querySnapshot.forEach((doc) => {
          booksArray.push({ id: doc.id, ...doc.data() });
        });
        books.value = booksArray;
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    const editBook = (book) => {
      editingBook.value = { ...book }; 
    };

    const updateBook = async () => {
      try {
        if (editingBook.value) {
          const bookRef = doc(db, 'books', editingBook.value.id);
          await updateDoc(bookRef, {
            name: editingBook.value.name,
            isbn: editingBook.value.isbn
          });
          alert('Book updated successfully!');
          editingBook.value = null;
          fetchBooks(); 
        }
      } catch (error) {
        console.error('Error updating book:', error);
      }
    };

    const deleteBook = async (bookId) => {
      try {
        await deleteDoc(doc(db, 'books', bookId));
        alert('Book deleted successfully!');
        fetchBooks();
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    };

    onMounted(() => {
      fetchBooks();
    });

    return {
      books,
      editingBook,
      editBook,
      updateBook,
      deleteBook
    };
  }
};
</script>
