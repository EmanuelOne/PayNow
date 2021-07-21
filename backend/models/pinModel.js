import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const pinSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    pin: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Pin = mongoose.model("Pin", pinSchema);

export default Pin;
