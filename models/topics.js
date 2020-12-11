const { Schema, model } = require("mongoose");

const topics = new Schema({
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

const topic = new model("Topics", topics);

module.exports = topic;
