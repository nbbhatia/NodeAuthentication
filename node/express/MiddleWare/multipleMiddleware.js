const express = require("express");
const app = express();
// 1st route with middleware
app.use("/", (req, res, next) => {
  res.send("from home page");
});
// second middleware
app.use("/addProduct", (req, res, next) => {
  res.send(
    '<form action="/product" method="POST"><input type="text" name="title"> <button type="submit"> </button></form>'
  );
});
app.use("/product", (req, res, next) => {
  console.log("req.body", req.body);
  res.redirect("/");
});
app.listen(4000);
