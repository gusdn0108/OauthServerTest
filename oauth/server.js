const express = require("express");
const nunjucks = require("nunjucks");
const router = require("./router");
const app = express();

app.set("view engine", "html");
nunjucks.configure("view", {
  express: app,
  watch: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/login", (req, res) => {
  res.render("index.html");
});

app.use("/api", router);

app.listen(8000, (req, res) => {
  console.log("oauth server start 8000");
});
