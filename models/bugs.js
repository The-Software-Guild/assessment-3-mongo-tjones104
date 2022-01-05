const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bugSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    time: { type: String, required: true },
    date: { type: String, required: true },
    assignee: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { versionKey: false }
);

const Bug = mongoose.model("Bug", bugSchema);

module.exports = Bug;
