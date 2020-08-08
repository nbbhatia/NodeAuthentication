const express = require("express");
const fs = require("fs");
const app = express();
// for practice
app.get("/", (req, res) => {
  res.send("practice");
});
// fs for async
// fs.readFile("index.txt", (err, data) => {
//   if (err) {
//     return console.log("err", err);
//   }
//   console.log("Async", data.toString());
// });

console.log("app is running on 9090");
app.listen(9091);
