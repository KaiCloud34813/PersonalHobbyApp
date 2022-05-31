require("dotenv").config();
require("./api/data/db.js");

const exp = require("constants");
const express = require("express");
const path = require("path");
const routes = require("./api/routes");

const app = express();

app.use(function (req, res, next) {
  console.log(req.method, req.url);
  next();
});
app.use(express.json());

app.use("/api", routes);

app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(process.env.PORT, function (req, res) {
  console.log("Listening to port" + server.address().port);
});
