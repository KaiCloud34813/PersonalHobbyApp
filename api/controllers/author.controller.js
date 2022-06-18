const { response } = require("express");
const mongoose = require("mongoose");
const Book = mongoose.model(process.env.DB_BOOK_MODEL);

let addOne = function (req, res) {
  const response = { status: process.env.STATUS_SUCCESS, message: "" };
  const bookId = req.params.bookId;
  Book.findById(bookId)
    .select("author")
    .exec()
    .then((book) => {
      if (!book) {
        _fillResponse(
          response,
          process.env.STATUS_NOT_FOUND,
          process.env.NOT_FOUND_MESSAGE
        );
        _sendResponse(res, response);
      } else {
        _addAuthor(req, res, book);
      }
    })
    .catch((err) => _fillResponse(response, process.env.STATUS_ERROR, err));
};

const _addAuthor = function (req, res, book) {
  const response = { status: process.env.STATUS_SUCCESS, message: "" };
  let a = req.body.name;
  let b = req.body.country;
  book.author.push({ name: a, country: b });

  book
    .save()
    .then((book) => {
      _fillResponse(response, process.env.STATUS_SUCCESS, book.author);
    })
    .catch((err) => _fillResponse(response, process.env.STATUS_ERROR, err))
    .finally(() => _sendResponse(res, response));
};

let getAll = function (req, res) {
  const response = { status: process.env.STATUS_SUCCESS, message: "" };
  const bookId = req.params.bookId;

  Book.findById(bookId)
    .select("author")
    .exec()
    .then((book) => {
      if (!book) {
        _fillResponse(
          response,
          process.env.STATUS_NOT_FOUND,
          process.env.NOT_FOUND_MESSAGE
        );
      } else {
        _fillResponse(response, process.env.STATUS_SUCCESS, book.author);
      }
    })
    .catch((err) => _fillResponse(response, process.env.STATUS_ERROR, err))
    .finally(() => _sendResponse(res, response));
};

let getOne = function (req, res) {
  let response = { status: process.env.STATUS_SUCCESS, message: "" };
  const bookId = req.params.bookId;
  const authorId = req.params.authorId;

  Book.findById(bookId)
    .select("author")
    .exec()
    .then((book) => {
      if (!book.author.id(authorId)) {
        _fillResponse(
          response,
          process.env.STATUS_NOT_FOUND,
          process.env.NOT_FOUND_MESSAGE
        );
      } else {
        _fillResponse(
          response,
          process.env.STATUS_SUCCESS,
          book.author.id(authorId)
        );
      }
    })
    .catch((err) => _fillResponse(response, process.env.STATUS_ERROR, err))
    .finally(() => _sendResponse(res, response));
};

let deleteOne = function (req, res) {
  let response = { status: process.env.STATUS_SUCCESS, message: "" };

  const bookId = req.params.bookId;
  const authorId = req.params.authorId;

  Book.findById(bookId)
    .exec()
    .then((book) => {
      if (!book) {
        _fillResponse(
          response,
          process.env.STATUS_ERROR,
          process.env.NOT_FOUND_MESSAGE
        );
      } else {
        Book.updateOne(
          { _id: bookId },
          { $pull: { author: { _id: authorId } } }
        )
          .then((book) =>
            _fillResponse(
              response,
              process.env.STATUS_SUCCESS,
              book.author.id(authorId)
            )
          )
          .catch((err) =>
            _fillResponse(response, process.env.STATUS_ERROR, err)
          );
      }
    })
    .catch((err) => _fillResponse(response, process.env.STATUS_ERROR, err))
    .finally(() => _sendResponse(res, response));
};

const _updateOne = function (req, res, updatedBookCallBack) {
  const bookId = req.params.bookId;
  const response = {
    status: process.env.STATUS_SUCCESS,
    message: "",
  };
  Book.findById(bookId)
    .exec()
    .then((book) => {
      if (!book) {
        _fillResponse(
          response,
          process.env.STATUS_RES_NOTFOUND,
          process.env.NOT_FOUND_MESSAGE + bookId
        );
        _sendResponse(res, response);
      } else {
        updatedBookCallBack(req, res, book);
      }
    })
    .catch((err) => _fillResponse(response, process.env.STATUS_ERROR, err));
};

const _fullAuthorUpdate = function (req, res, book) {
  const response = { status: process.env.STATUS_SUCCESS, message: "" };
  const authorId = req.params.authorId;
  book.author.id(req.params.authorId).name = req.body.name;
  book.author.id(req.params.authorId).country = req.body.country;

  book
    .save()
    .then((book) =>
      _fillResponse(
        response,
        process.env.STATUS_SUCCESS,
        book.author.id(authorId)
      )
    )
    .catch((err) => _fillResponse(response, process.env.STATUS_ERROR, err))
    .finally(() => _sendResponse(res, response));
};
const fullUpdateOne = function (req, res) {
  _updateOne(req, res, _fullAuthorUpdate);
};

const _partialAuthorUpdate = function (req, res, book) {
  const response = { status: process.env.STATUS_SUCCESS, message: "" };
  const authorId = req.params.authorId;
  if (req.body.name) {
    book.author.id(authorId).name = req.body.name;
  }
  if (req.body.country) {
    book.author.id(authorId).country = req.body.country;
  }
  book
    .save()
    .then((book) =>
      _fillResponse(
        response,
        process.env.STATUS_SUCCESS,
        book.author.id(authorId)
      )
    )
    .catch((err) => _fillResponse(response, process.env.STATUS_ERROR, err))
    .finally(() => _sendResponse(res, response));
};
const partialUpdateOne = function (req, res) {
  _updateOne(req, res, _partialAuthorUpdate);
};

const _fillResponse = function (response, status, message) {
  response.status = status;
  response.message = message;
};

const _sendResponse = function (res, response) {
  return res.status(response.status).json(response.message);
};
module.exports = {
  addOne,
  getOne,
  getAll,
  deleteOne,
  fullUpdateOne,
  partialUpdateOne,
};
