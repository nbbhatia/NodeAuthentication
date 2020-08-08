const express = require("express");
const router = express.Router();
const admindata = require("./admin");
router.get("/", (req, res, next) => {
  console.log("shop.js", admindata.products);
  res.send("<h1> hello I am from routes</h1>");
});
module.exports = router;
