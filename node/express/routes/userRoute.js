const express = require("express");
const { signup, signIn, signout } = require("../controllers/userController");
const {
  userById,
  allUsers,
  getUser,
  UpdateUser,
  deleteUser,
} = require("../controllers/userUpdateProfile");
const { requireSignin } = require("../controllers/userController");
const { userSignupValidator } = require("../Validators");
const router = express.Router();

router.post("/signup", userSignupValidator, signup);
router.post("/signin", signIn);
router.get("/signout", signout);

router.get("/users", allUsers);
router.get("/user/:userId", requireSignin, getUser);
// for update
// two http method is used put and patch
// put method is used for entire changes in body and patch method is used for some small changes
router.put("/user/:userId", requireSignin, UpdateUser);

// delete user

router.delete("/user/:userId", requireSignin, deleteUser);

// any route containig userId,our app will first execute userById()
router.param("userId", userById);

module.exports = router;
