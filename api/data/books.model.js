const mongoose = require("mongoose");

const authorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  pages: {
    type: Number,
    required: true,
  },
  author: [authorSchema],
});

mongoose.model(process.env.DB_BOOK_MODEL, bookSchema);
