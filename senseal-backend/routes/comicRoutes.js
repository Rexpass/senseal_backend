// const express = require('express');
// const router = express.Router();
// const comicController = require('../controllers/comicController');

// router.get('/', comicController.getComics);
// router.get('/:id', comicController.getComicById);
// router.post('/', comicController.createComic);
// router.put('/:id', comicController.updateComic);
// router.delete('/:id', comicController.deleteComic);

// module.exports = router;

const express = require('express');
const upload = require('../services/uploadService');
const { createBook } = require('../services/bookService');

const router = express.Router();

// Route to upload comic image and create a book
router.post('/upload', (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
      // Create a new book with the uploaded image path
      const bookData = {
        title: req.body.title,
        author: req.body.author,
        releaseDate: req.body.releaseDate,
        coverImageUrl: `/uploads/${req.file.filename}`,  // Save the image path
      };

      const savedBook = await createBook(bookData);
      res.status(201).json({
        message: 'Comic uploaded successfully',
        book: savedBook,
      });
    } catch (error) {
      res.status(500).json({ error: 'Error saving comic and file' });
    }
  });
});

module.exports = router;
