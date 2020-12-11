const { Schema, model } = require("mongoose");

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  data: {
    type: Date,
    default: Date.now,
  },
});

const post = new model("Post", PostSchema);

module.exports = post;
