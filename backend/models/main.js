const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const componentSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});


const Component = mongoose.model("Component", componentSchema);

module.exports = Component;
