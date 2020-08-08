const express = require("express");
const app = express();
// use method is use for middleware which is defined by express.js//
app.use((req, res, next) => {
  console.log("1st middleware");
  console.log("done");
  next();
});
// second middleware is not working untill first is not allowed to second for doing thie job //
// untill we are not use next() method we are not using next middleware //
app.use((req, res, next) => {
  res.send("<h1>hello world</h1>");
});
// console.log("done");
app.listen(3000);
