const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const countSchema = new Schema({
  addCount: {
    type: Number,
    default: 0,
  },
  updateCount: {
    type: Number,
    default: 0,
  },
});

const Count = mongoose.model("Count", countSchema);

module.exports = Count;
