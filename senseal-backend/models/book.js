const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  coverImageUrl: { type: String, required: true },  // Path to the uploaded image
}, {
  timestamps: true,  // Automatically add createdAt and updatedAt fields
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
