"use strict";
const express = require("express");

const path = require("path");
const app = express();

app.use(express.static("home"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./home/index.html"));
});

if (process.env.NODE_ENV === "production") {
  app.use(function(req, res, next) {
    var protocol = req.get("x-forwarded-proto");
    protocol == "https"
      ? next()
      : res.redirect("https://" + req.hostname + req.url);
  });
}
let port = process.env.PORT || 3000;
app
  .listen(port, function() {
    console.log(`Listening at port ${port}`);
  })
  .on("error", function(error) {
    console.log(error);
  });
