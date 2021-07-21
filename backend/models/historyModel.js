import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const historySchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    message: {
      type: String,
      required: true,
    },

    value: {
      type: mongoose.Number,
      required: true,
    },
    time: {
      time: String,
      date: String,
    },
    balance: mongoose.Number,
  },
  {
    timestamps: true,
  }
);
const History = mongoose.model("History", historySchema);

export default History;
