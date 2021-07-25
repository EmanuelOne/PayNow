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

    amount: {
      type: mongoose.Number,
      required: true,
    },
    time: {
      time: String,
      date: String,
    },
    receipientName: {
      type: String,
    },
    receipientId: {
      type: mongoose.Schema.Types.ObjectId,
    },

    balance: mongoose.Number,
  },
  {
    timestamps: true,
  }
);
const History = mongoose.model("History", historySchema);

export default History;
