const express = require("express");
const booksController = require("../controllers/books.controller");
const authorController = require("../controllers/author.controller");

const router = express.Router();

router.route("/books").get(booksController.getAll).post(booksController.addOne);

router
  .route("/books/:bookId")
  .get(booksController.getOne)
  .delete(booksController.deleteOne)
  .put(booksController.fullUpdateOne)
  .patch(booksController.partialUpdateOne);

router
  .route("/books/:bookId/author")
  .get(authorController.getAll)
  .post(authorController.addOne);

router
  .route("/books/:bookId/author/:authorId")
  .get(authorController.getOne)
  .delete(authorController.deleteOne)
  .put(authorController.fullUpdateOne)
  .patch(authorController.partialUpdateOne);

module.exports = router;
