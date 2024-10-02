/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});

admin.initializeApp();

exports.countBooks = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();
      const count = snapshot.size;
      res.status(200).json({count});
    } catch (error) {
      console.error("Error counting books:", error.message);
      res.status(500).json({error: "Error counting books"});
    }
  });
});

exports.addBook = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }
    const {isbn, name} = req.body;
    const isbnNumber = Number(isbn);
    if (isNaN(isbnNumber)) {
      return res.status(400).send("ISBN must be a valid number");
    }
    try {
      const booksCollection = await admin.firestore().collection("books").add({
        isbn: isbnNumber,
        name: name,
      });

      return res.status(200).send(`Book added with ID: ${booksCollection.id}`);
    } catch (error) {
      console.error("Error adding book:", error);
      return res.status(500).send("Error adding book");
    }
  });
});
