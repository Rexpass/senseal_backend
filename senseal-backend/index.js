const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const { createBook } = require('./services/bookService');  // Import the createBook function
const comicRoutes = require('./routes/comicRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use(express.json());

// Routes
app.use('/api/comics', comicRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    
    // Start the server only after the database connection is successful
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Example route to create a book (instead of doing it on server start)
// app.post('/api/books', async (req, res) => {
//   try {
//     const bookData = {
//       title: 'The Great Gatsby',
//       author: 'F. Scott Fitzgerald',
//       releaseDate: new Date('1925-04-10'),
//       coverImageUrl: 'https://example.com/great-gatsby.jpg',
//     };

//     // Call the createBook method with book data
//     const savedBook = await createBook(bookData);
//     res.status(201).json({ book: savedBook });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Failed to create book' });
//   }
// });
