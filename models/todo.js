const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    username: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    discription: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      enum: ["Work", "Task", "Hobby"],
      required: true,
      default: "Work",
    },
    completedStatus: {
      type: String,
      enum: ["todo", "inProgress", "competed"],
      default: "todo",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);
