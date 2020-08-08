const mongoose = require("mongoose");
var uuidv1 = require("uuidv1");
const crypto = require("crypto");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true, // if they have space in starting of name so that will be remove by using trim=true
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  hashed_password: {
    type: String,
    // required: true,
  },
  salt: String, //randomly generated long string
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
});

// Virtual feild
userSchema
  .virtual("password")
  .set(function (password) {
    // create temporary variable called _password
    this._password = password;
    // generate a timestamp
    this.salt = uuidv1();
    // encryptedpassword
    this.hashed_password = this.encryptedPassword(password);
  })
  .get(function () {
    return this._password;
  });
// methods encrypted password
userSchema.methods = {
  // authenticate method which is used earlier in user.controllers
  authenticate: function (plainText) {
    return this.encryptedPassword(plainText) === this.hashed_password;
  },
  encryptedPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};
module.exports = mongoose.model("User", userSchema);
