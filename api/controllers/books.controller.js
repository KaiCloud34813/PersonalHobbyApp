const mongoose = require("mongoose");
const Book = mongoose.model(process.env.DB_BOOK_MODEL);

module.exports.getAll = function (req, res) {
  Book.find().exec(function (err, book) {
    const response = { status: 200, message: book };
    if (err) {
      console.log("Error finding books");
      response.status = 500;
      response.message = err;
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.getOne = function (req, res) {
  const bookId = req.params.bookId;
  Book.findById(bookId).exec(function (err, book) {
    const response = { status: 200, message: book };
    if (err) {
      console.log("Error finding this book");
      response.status = 500;
      response.message = err;
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.addOne = function (req, res) {
  console.log("Book AddOne request");

  const newBook = {
    title: req.body.title,
    year: req.body.year,
    pages: req.body.pages,
    author: [],
  };

  Book.create(newBook, function (err, book) {
    const response = { status: 201, message: book };
    if (err) {
      console.log("Error creating book");
      response.status = 500;
      response.message = err;
    }

    res.status(response.status).json(response.message);
  });
};

module.exports.deleteOne = function (req, res) {
  const bookId = req.params.bookId;
  Book.findByIdAndDelete(bookId).exec(function (err, deletedBook) {
    const response = { status: 204, message: deletedBook };
    if (err) {
      console.log("Error finding game");
      response.status = 500;
      response.message = err;
    } else if (!deletedBook) {
      console.log("Book id not found");
      response.status = 404;
      response.message = {
        message: "Book ID not found",
      };
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.fullUpdateOne = function (req, res) {
  const bookId = req.params.bookId;
  let response = {
    status: 200,
    message: {},
  };
  if (mongoose.isValidObjectId(bookId)) {
    Book.findById(bookId).exec(function (err, book) {
      if (!book) {
        response.status = 404;
        response.message = { message: "book with given id is not in db" };
      } else {
        book.title = req.body.title;
        book.year = req.body.year;
        book.pages = req.body.pages;
        book.author = req.body.author;
        book.save(function (err, updatedBook) {
          if (err) {
            response.status = 500;
            response.message = err;
          } else {
            response.status = 202;
            response.message = updatedGame;
          }
          res.status(response.status).send(response.message);
        });
      }
    });
  }
};
