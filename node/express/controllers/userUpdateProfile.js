const User = require("../models/userModel");
const _ = require("lodash");

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "USEr not found",
      });
    }
    // add the user which is find from ID add in req with the name of profile//
    req.profile = user;
    next();
  });
};

exports.hasAuthorization = (req, res, next) => {
  const authorized =
    req.profile && req.auth && req.profile._id === req.auth._id;
  if (!authorized) {
    return res.status(403).json({
      error: "User is not authorized to perfrom this action",
    });
  }
};

exports.allUsers = (req, res) => {
  User.find((err, users) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({ users });
  }).select("name emailupdated created");
};
// for fetch single user
exports.getUser = (req, res) => {
  // we set hashedpassword undefined and salt also
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

// user profile update user

exports.UpdateUser = (req, res, next) => {
  let user = req.profile;
  // user is the source object which is change based of req.body
  user = _.extend(user, req.body); //extend is the method of lodash which is muttate the source object

  user.updated = Date.now();
  user.save((err) => {
    if (err) {
      res.status(400).json({
        error: "You r not authorized to perform this action",
      });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json({ user: user });
  });
};

// user Delete

exports.deleteUser = (req, res) => {
  let user = req.profile;
  user.remove((err, user) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json({ message: "your account has been deleted sucessfull" });
  });
};
