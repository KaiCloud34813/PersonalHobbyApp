require("dotenv").config();
require("./api/data/db.js");
bodyParser = require("body-parser");

const exp = require("constants");
const express = require("express");
const path = require("path");
const routes = require("./api/routes");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(function (req, res, next) {
  console.log(req.method, req.url);
  next();
});

app.use("/api", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, XRequested-With, Content-Type, Accept,Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", routes);

app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(process.env.PORT, function (req, res) {
  console.log("Listening to port" + server.address().port);
});
