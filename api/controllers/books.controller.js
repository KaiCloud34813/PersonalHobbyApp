const mongoose = require("mongoose");
const Book = mongoose.model(process.env.DB_BOOK_MODEL);

let getAll = function (req, res) {
  let offset = parseInt(process.env.DEFAULT_OFFSET, 10);
  let count = parseInt(process.env.DEFAULT_COUNT, 10);
  const max = parseInt(process.env.MAX, 10);
  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }
  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
  }
  if (isNaN(offset) || isNaN(count)) {
    res.status(400).json({ message: "offset and count should be numbers." });
    return;
  }
  if (count > max) {
    res.status(400).json({ message: "Cannot exceed count of: ", max });
    return;
  }
  Book.find()
    .skip(offset)
    .limit(count)
    .exec(function (err, book) {
      const response = { status: 200, message: book };
      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!book) {
        response.status = 404;
        response.message = "no book was found";
      }
      res.status(response.status).json(response.message);
    });
};

let getOne = function (req, res) {
  const bookId = req.params.bookId;
  Book.findById(bookId).exec(function (err, book) {
    const response = { status: 200, message: book };
    if (err) {
      response.status = 500;
      response.message = err;
    } else if (!book) {
      response.status = 404;
      response.message = "book with id " + bookId + " was not found.";
    }
    res.status(response.status).json(response.message);
  });
};

let addOne = function (req, res) {
  const newBook = {
    title: req.body.title,
    year: req.body.year,
    pages: req.body.pages,
    author: [],
  };

  Book.create(newBook, function (err, book) {
    const response = { status: 201, message: book };
    if (err) {
      response.status = 500;
      response.message = err;
    }
    res.status(response.status).json(response.message);
  });
};

let deleteOne = function (req, res) {
  const bookId = req.params.bookId;
  Book.findByIdAndDelete(bookId).exec(function (err, deletedBook) {
    const response = { status: 204, message: deletedBook };
    if (err) {
      response.status = 500;
      response.message = err;
    } else if (!deletedBook) {
      response.status = 404;
      response.message = {
        message: "Book ID not found",
      };
    }
    res.status(response.status).json(response.message);
  });
};

const _updateOne = function (req, res, updateBookCallback) {
  const bookId = req.params.bookId;
  Book.findById(bookId).exec(function (err, book) {
    const response = { status: 200, message: book };
    if (err) {
      response.status = 500;
      response.message = err;
    } else if (!book) {
      response.status = 404;
      response.message = { message: "book with given id is not in db" };
    }
    if (response.status !== 204) {
      res.status(response.status).json(response.message);
    } else {
      updateBookCallback(req, res, book, response);
    }
  });
};

let fullUpdateOne = function (req, res) {
  bookUpdate = function (req, res, book, response) {
    book.title = req.body.title;
    book.year = req.body.year;
    book.pages = req.body.pages;
    book.author = req.body.author;
    book.save(function (err, updatedBook) {
      if (err) {
        response.status = 500;
        response.message = err;
      }
      res.status(response.status).json(response.message);
    });
  };
  _updateOne(req, res, bookUpdate);
};

let partialUpdateOne = function (req, res) {
  BookUpdate = function (req, res, book, response) {
    if (req.body.title) {
      book.title = req.body.title;
    }
    if (req.body.year) {
      book.year = req.body.year;
    }
    if (req.body.pages) {
      book.pages = req.body.pages;
    }
    if (req.body.author) {
      book.author = req.body.author;
    }
    book.save(function (err, updatedBook) {
      if (err) {
        response.status = 500;
        response.message = err;
      }
      res.status(response.status).json(response.message);
    });
  };
  _updateOne(req, res, bookUpdate);
};

// let fullUpdateOne = function (req, res) {
//   const bookId = req.params.bookId;
//   let response = {
//     status: 200,
//     message: {},
//   };
//   if (mongoose.isValidObjectId(bookId)) {
//     Book.findById(bookId).exec(function (err, book) {
//       if (!book) {
//         response.status = 404;
//         response.message = { message: "book with given id is not in db" };
//       } else {
//         book.title = req.body.title;
//         book.year = req.body.year;
//         book.pages = req.body.pages;
//         book.author = req.body.author;
//         book.save(function (err, updatedBook) {
//           if (err) {
//             response.status = 500;
//             response.message = err;
//           } else {
//             response.status = 202;
//             response.message = updatedBook;
//           }
//           res.status(response.status).send(response.message);
//         });
//       }
//     });
//   }
// };

// let partialUpdateOne = function (req, res) {
//   console.log("Partial update of One Book");

//   const bookId = req.params.bookId;
//   if (mongoose.isValidObjectId(bookId)) {
//     Book.findById(bookId).exec(function (err, book) {
//       const response = {
//         status: 200,
//         message: book,
//       };

//       if (!book) {
//         console.log("Book not found");
//         response.status = 404;
//         response.message = { message: "book with the given Id not found" };
//       } else {
//         if (req.body.title) {
//           book.title = req.body.title;
//         }

//         if (req.body.year) {
//           book.year = req.body.year;
//         }

//         if (req.body.pages) {
//           book.pages = req.body.pages;
//         }

//         if (req.body.author) {
//           book.author = req.body.author;
//         }

//         book.save(function (err, updatedBook) {
//           if (err) {
//             response.status = 500;

//             response.message = err;
//           } else {
//             response.status = 202;

//             response.status = updatedBook;
//           }
//         });

//         res.status(response.status).json(response.message);
//       }
//     });
//   }
// };

module.exports = {
  getAll,
  getOne,
  addOne,
  deleteOne,
  partialUpdateOne,
  fullUpdateOne,
};
