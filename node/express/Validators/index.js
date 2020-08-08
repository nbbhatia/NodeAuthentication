exports.createPostValidator = (req, res, next) => {
  //for Title//
  req.check("title", "Write a title").notEmpty();
  req
    .check("title", "Title must be b/w 4 to 150 characters")
    .isLength({ min: 5, max: 150 });
  // for body//
  req.check("body", "Write a body").notEmpty();
  req
    .check("body", "body must be b/w 5 to 2000")
    .isLength({ min: 5, max: 2000 });
  // check errors
  const errors = req.validationErrors();
  //   if error show the first one as ther happen
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  //   proceed to next middleware
  next();
};
exports.userSignupValidator = (req, res, next) => {
  // name is not null and b/w 4-10 char
  req.check("name", "name is required").notEmpty();
  req
    .check("email", "Email must be 3 to 32 char")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contained @")
    .isLength({ min: 4, max: 2000 });
  req
    .check("password")
    .isLength({ min: 6 })
    .withMessage("Password must contain atleast 6 characters ")
    .matches(/\d/)
    .withMessage("Password must contain number");
  // check errors
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
};
