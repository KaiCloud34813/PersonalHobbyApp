const express = require("express");
const usersRouter = require('./users.router')
const booksRouter = require('./books.router')

const router = express.Router();

router.use('/users', usersRouter)//working
router.use('/books', booksRouter)//working

module.exports = router;
