const Book = require('../models/book');

// Function to create a new book
const createBook = async (bookData) => {
  try {
    // Create a new book instance
    const newBook = new Book(bookData);

    // Save the book to the database
    const savedBook = await newBook.save();

    // Return the saved book
    return savedBook;
  } catch (error) {
    // Handle errors and propagate them
    throw new Error(`Error creating book: ${error.message}`);
  }
};

module.exports = {
  createBook,
};
