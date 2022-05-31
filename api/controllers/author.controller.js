const mongoose = require("mongoose");
const Book = mongoose.model(process.env.DB_BOOK_MODEL);

module.exports.addOne = function (req, res) {
  console.log("Add One Author Controller");
  const bookId = req.params.bookId;
  Book.findById(bookId)
    .select("author")
    .exec(function (err, book) {
      console.log("Found book ", book);
      const response = { status: 200, message: book };
      if (err) {
        console.log("Error finding book");
        response.status = 500;
        response.message = err;
      } else if (!book) {
        console.log("Error finding book");
        response.status = 404;
        response.message = { message: "book ID not found " + bookId };
      }
      if (book) {
        _addAuthor(req, res, book);
      } else {
        res.status(response.status).json(response.message);
      }
    });
};

const _addAuthor = function (req, res, book) {
  let a = req.body.name;
  let b = req.body.country;
  book.author.push({ name: a, country: b });

  book.save(function (err, updatedBook) {
    const response = { status: 200, message: [] };
    if (err) {
      response.status = 500;
      response.message = err;
    } else {
      response.status = 201;
      response.message = updatedBook.author;
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.getAll = function (req, res) {
  console.log("Trying to get all the authors of a book");
  const bookId = req.params.bookId;

  Book.findById(bookId)
    .select("author")
    .exec(function (err, book) {
      res.status(200).send(book.author);
    });
};

module.exports.getOne = function (req, res) {
  const bookId = req.params.bookId;
  const authorId = req.params.authorId;

  Book.findById(bookId)
    .select("author")
    .exec(function (err, book) {
      res.status(200).send(book.author.id(authorId));
    });
};

module.exports.deleteOne = function (req, res) {
  const bookId = req.params.bookId;
  const authorId = req.params.authorId;

  //Book.findById(bookId)
  Book.findById(bookId).exec(function (err, book) {
    if (err) {
      console.log(err);
    } else {
      Book.updateOne(
        { _id: bookId },
        { $pull: { author: { _id: authorId } } },
        function (err, results) {
          if (!err) {
            console.log("successfully deleted");
            res.send(results);
          } else {
            console.log("error in deletion");
            res.send(err);
          }
        }
      );
    }
  });
};

module.exports.fullUpdateOne = function (req, res) {
  const bookId = req.params.bookId;
  const authorId = req.params.authorId;
  let response = {
    status: 200,
    message: {},
  };
  if (mongoose.isValidObjectId(bookId) && mongoose.isValidObjectId(authorId)) {
    Book.findById(bookId).exec(function (err, book) {
      if (!book) {
        response.status = 404;
        response.message = { message: "Book with given id is not in db" };
      }
      if (!book.author) {
        response.status = 404;
        response.message = { message: "Author with given id is not in db" };
      } else {
        book.author.id(authorId).name = req.body.name;
        book.author.id(authorId).country = req.body.country;
        book.save(function (err, updatedBook) {
          const response = {
            status: 204,
            message: updatedBook.author.id(authorId),
          };
          if (err) {
            response.status = 500;
            response.message = err;
          }
          //res.status(response.status).send(response.message);
        });
      }
      res.status(response.status).send(response.message);
    });
  }
};

module.exports.partialUpdateOne = function (req, res) {
  const bookId = req.params.bookId;
  const authorId = req.params.authorId;
  let response = {
    status: 200,
    message: {},
  };
  if (mongoose.isValidObjectId(bookId) && mongoose.isValidObjectId(authorId)) {
    Book.findById(bookId).exec(function (err, book) {
      if (!book) {
        response.status = 404;
        response.message = { message: "Book with given id is not in db" };
      }
      if (!book.author) {
        response.status = 404;
        response.message = { message: "Author with given id is not in db" };
      } else {
        if (req.body.name) {
          book.author.id(authorId).name = req.body.name;
        }
        if (req.body.country) {
          book.author.id(authorId).country = req.body.country;
        }
        book.save(function (err, updatedBook) {
          const response = {
            status: 204,
            message: updatedBook.author.id(authorId),
          };
          if (err) {
            response.status = 500;
            response.message = err;
          }
          //res.status(response.status).send(response.message);
        });
      }
      res.status(response.status).send(response.message);
    });
  }
};
