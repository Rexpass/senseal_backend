const mongoose = require('mongoose');

const comicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  releaseDate: { type: Date, required: true },
});

module.exports = mongoose.model('Comic', comicSchema);
