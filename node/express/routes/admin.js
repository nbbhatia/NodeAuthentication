const express = require("express");
const router = express.Router();
let products = [];
// router.use() is used for all req not specific for post/get
router.get("/add-product", (req, res, next) => {
  res.send(
    '<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Submit</button></form>'
  );
});
router.post("/product", (req, res, next) => {
  products.push({ title: req.body.title });
  console.log("products", products);
  res.redirect("/");
});
exports.routes = router;
exports.products = products;
