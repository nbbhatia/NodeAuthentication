const jwt = require("jsonwebtoken");

require("dotenv").config();
const expressJwt = require("express-jwt");
const User = require("../models/userModel");

// **************for user create*************//
exports.signup = async (req, res) => {
  const UserExist = await User.findOne({ email: req.body.email });
  if (UserExist)
    return res.status(403).json({
      error: "User is already exist",
    });
  const user = await new User(req.body);
  await user.save();
  res.status(200).json({ user });
};
// *************for user login**************//
exports.signIn = (req, res) => {
  // steps follow in sign in
  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        error: "User with this email is not exist, please first register",
      });
    }
    // if user is found make sure the email nd password match
    // create a authentication method in model and use here
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and Password do not",
      });
    }
    // genertae a token with usre id nd secret key
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    // persists the token as the name "t name of token "  in cookie with expiry date
    res.cookie("generatedToken", token, { expire: new Date() + 9999 });
    // return response with user and token to frontend client
    const { _id, name, email } = user;
    return res.json({ token, user: { _id, email, name } });
  });

  // find the user based on email
  // if error or no user
  // if users found  will we try to authenticate the user
  // if users found and authenticate it means they sent the correct information and we generate a token with user id and secret
  // persists the token as the name "t name of token "  in cookie with expiry date
};
// ***************user singout**********************//
exports.signout = (req, res) => {
  res.clearCookie("generatedToken");
  return res.json({ message: "signout Sucess" });
};

// for route authentication
exports.requireSignin = expressJwt({
  //  if the token is valid , express jwt appends the verified userID  in an auth key to the req obj
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  // userProperty: "auth",
});
