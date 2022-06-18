const mongoose = require("mongoose");
const Book = mongoose.model(process.env.DB_BOOK_MODEL);

let getAll = function (req, res) {
  const response = { status: process.env.STATUS_SUCCESS, message: "" };
  const limit = _checkHardening(req, res, response);

  if (limit.error) {
    _sendResponse(res, response);
  } else {
    Book.find()
      .skip(limit.offset)
      .limit(limit.count)
      .exec()
      .then((books) =>
        _fillResponse(response, process.env.STATUS_SUCCESS, books)
      )
      .catch((err) => _fillResponse(response, process.env.STATUS_ERROR, err))
      .finally(() => _sendResponse(res, response));
  }
};

let getOne = function (req, res) {
  const response = { status: process.env.STATUS_SUCCESS, message: "" };
  const bookId = req.params.bookId;

  Book.findById(bookId)
    .exec()
    .then((book) => {
      if (!book) {
        _fillResponse(
          response,
          process.env.STATUS_NOT_FOUND,
          process.env.NOT_FOUND_MESSAGE
        );
      } else {
        _fillResponse(response, process.env.STATUS_SUCCESS, book);
      }
    })
    .catch((err) => _fillResponse(response, process.env.STATUS_ERROR, err))
    .finally(() => _sendResponse(res, response));
};

let addOne = function (req, res) {
  const response = { status: process.env.STATUS_SUCCESS, message: "" };

  const newBook = {
    title: req.body.title,
    year: req.body.year,
    pages: req.body.pages,
    author: [],
  };

  Book.create(newBook)
    .then((book) => _fillResponse(response, process.env.STATUS_CREATED, book))
    .catch((err) => _fillResponse(response, process.env.STATUS_ERROR, err))
    .finally(() => _sendResponse(res, response));
};

let deleteOne = function (req, res) {
  const response = {
    status: process.env.STATUS_NO_CONTENT_SUCCESS,
    message: "",
  };
  const bookId = req.params.bookId;

  Book.findByIdAndDelete(bookId)
    .exec()
    .then((deletedbook) => {
      if (!deletedbook) {
        _fillResponse(
          response,
          process.env.STATUS_NOT_FOUND,
          process.env.STATUS_NO_CONTENT_SUCCESS
        );
      } else {
        _fillResponse(response, process.env.STATUS_SUCCESS, deletedbook);
      }
    })
    .catch((err) => _fillResponse(response, process.env.STATUS_ERROR, err))
    .finally(() => _sendResponse(res, response));
};

const _updateOne = function (req, res, updatedBookCallBack) {
  const response = {
    status: process.env.STATUS_SUCCESS,
    message: "",
  };
  const bookId = req.params.bookId;
  Book.findById(bookId)
    .exec()
    .then((book) => {
      if (!book) {
        _fillResponse(
          response,
          process.env.STATUS_NOT_FOUND,
          process.env.NOT_FOUND_MESSAGE
        );
      } else {
        updatedBookCallBack(req, res, book);
      }
    })
    .catch((err) => _fillResponse(response, process.env.STATUS_ERROR, err));
};

const _fullBookUpdate = function (req, res, book) {
  const response = { status: 204, message: "" };
  book.title = req.body.title;
  book.year = req.body.year;
  book.pages = req.body.pages;
  book.author = req.body.author;

  book
    .save()
    .then((book) => {
      _fillResponse(response, process.env.STATUS_SUCCESS, book);
    })
    .catch((err) => _fillResponse(response, process.env.STATUS_ERROR, err))
    .finally(() => _sendResponse(res, response));
};

const fullUpdateOne = function (req, res) {
  _updateOne(req, res, _fullBookUpdate);
};

const _partialBookUpdate = function (req, res, book) {
  const response = { status: process.env.STATUS_SUCCESS, message: "" };
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
  book
    .save()
    .then((book) => {
      _fillResponse(response, process.env.STATUS_SUCCESS, book);
    })
    .catch((err) => _fillResponse(response, process.env.STATUS_ERROR, err))
    .finally(() => _sendResponse(res, response));
};
const partialUpdateOne = function (req, res) {
  _updateOne(req, res, _partialBookUpdate);
};

const _fillResponse = function (response, status, message) {
  response.status = status;
  response.message = message;
};

const _sendResponse = function (res, response) {
  return res.status(response.status).json(response.message);
};

const _checkHardening = function (req, res, response) {
  let error = false;
  let offset = parseInt(process.env.DEFAULT_OFFSET, process.env.CONVERSION_BASE);
  let count = parseInt(process.env.DEFAULT_COUNT, process.env.CONVERSION_BASE);
  const max = parseInt(process.env.MAX, process.env.CONVERSION_BASE);

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, process.env.CONVERSION_BASE);
  }

  if (req.query && req.query.count) {
    count = parseInt(req.query.count, process.env.CONVERSION_BASE);
  }

  if (isNaN(offset) || isNaN(count)) {
    _fillResponse(response, process.env.STATUS_CLIENT_ERROR, {
      message: process.env.OFFSET_COUNT_MESSAGE,
    });
    error = true;
  }

  if (count > max) {
    _fillResponse(response, process.env.STATUS_CLIENT_ERROR, {
      message: process.env.COUNT_EXCEED_MESSAGE,
      max,
    });
    error = true;
  }

  const limit = { count: count, offset: offset, error: error };
  return limit;
};
module.exports = {
  getAll,
  getOne,
  addOne,
  deleteOne,
  partialUpdateOne,
  fullUpdateOne,
};
