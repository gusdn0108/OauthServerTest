const express = require("express");
const nunjucks = require("nunjucks");
const app = express();

app.set("view engine", "html");
nunjucks.configure("view", {
  express: app,
  watch: true,
});

app.get("/", (req, res) => {
  res.render("index.html");
});

app.listen(8080, (req, res) => {
  console.log("server A start 8080");
});
