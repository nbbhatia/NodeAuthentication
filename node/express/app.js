const express = require("express");
const bodyParser = require("body-parser");
// cookie parser is helps to pass the req cookie
var cookieParser = require("cookie-parser");
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const expressValidator = require("express-validator");
dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(expressValidator());
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected");
  });
mongoose.connection.on("error", (err) => {
  console.log(`DB connection error:${err.message}`);
});

// const adminData = require("./routes/admin");
// const shopRoutes = require("./routes/shop");
const PostRoutes = require("./routes/postRoutes");
const UserRoutes = require("./routes/userRoute");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// for routes
// app.use(shopRoutes);
// app.use(adminData.routes);
//without bodyparser we didnot get body data which is send in database
app.use("/", PostRoutes);
app.use("/", UserRoutes);
const port = process.env.PORT || 8080;

// with path
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).send("invalid token...");
  }
});
console.log("app is runnnig on ", port);

app.listen(port);
