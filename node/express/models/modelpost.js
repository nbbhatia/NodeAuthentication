const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required:
      // "Title is required",
      true,
    // now no need that validation bcz we use express-validtor
    // minlength: 4,
    // maxlength: 150,
  },
  body: {
    type: String,
    required: true,
    // minlength: 4,
    // maxlength: 2000,
  },
  photo: {
    type: Buffer, //when we upload a photo from frontend so it has some size so due that size it take some time to upload in backend by node.js so during that time node.js provide some space to store that image. but it will be store in backend the binary format
    contenType: String, // information about image is store in contentType key and  value is string
  },
  postedBy: {
    type: ObjectId,
    ref: "User", //ref the user model
  },
  created: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Post", postSchema);
