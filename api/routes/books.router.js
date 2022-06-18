const express = require("express");
const booksController = require("../controllers/books.controller");
const authorController = require("../controllers/author.controller");

const router = express.Router();

router.route("/").get(booksController.getAll).post(booksController.addOne); //working

router
  .route("/:bookId")
  .get(booksController.getOne) //working
  .delete(booksController.deleteOne) //working
  .put(booksController.fullUpdateOne) //working
  .patch(booksController.partialUpdateOne); //working

router
  .route("/:bookId/author")
  .get(authorController.getAll) //working
  .post(authorController.addOne); //working

router
  .route("/:bookId/author/:authorId")
  .get(authorController.getOne) //working
  .delete(authorController.deleteOne) //working
  .put(authorController.fullUpdateOne) //working
  .patch(authorController.partialUpdateOne); //working

module.exports = router;
