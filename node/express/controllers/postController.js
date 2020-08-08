const Post = require("../models/modelpost");
const formidable = require("formidable"); // this is used for parsing form data and especially file uploads
const fs = require("fs"); //it will access of file stystem
//get request//
exports.getPosts = (req, res) => {
  // static data

  // get data from database
  const posts = Post.find()
    .select("_id title body")
    .then((posts) => {
      res.status(200).json({ datafromBackend: posts });
      // or becz status(200) is default
      res.json({ backendData: posts });
    })
    .catch((err) => {
      console.log("err", err);
    });
};
//post request//
exports.createPost = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }
    let post = new Post();
    post.postedBy = req.profile;
    console.log("post", post);
  });

  // let form = new formidable.IncomingForm(); //IncomingForm method gives us a incoming form feilds
  // form.keepExtensions = true; //extensions of form

  // form.parse(req, (err, fields, files) => {
  //   if (err) {
  //     return res.status(400).json({
  //       error: "Image could not be uploaded",
  //     });
  //   }
  //   let post = new Post(fields);
  //   post.postedBy = req.profile;
  //   console.log("req.profile", req.profile);

  //   if (files.photo) {
  //     post.photo.data = fs.readFileSync(files.photo.path);
  //     post.photo.contentType = files.photo.type;
  //   }
  //   post.save((err, result) => {
  //     if (err) {
  //       return res.status(400).json({
  //         error: err,
  //       });
  //     }
  //     res.json(result);
  //   });
  //   next();
  // });
  // ****************** this method is used before create a connection between user and model
  // const post = new Post(req.body);
  // post.save().then((result) => {
  //   res.status(200).json({
  //     post: result,
  //   });
  // });
};
