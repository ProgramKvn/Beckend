const { Schema, model } = require("mongoose");

const topicCSS = new Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: Object,
    required: true,
  },
  categories: {
    type: String,
  },
});

const topiCss = new model("TopicsCSS", topicCSS);

module.exports = topiCss;
