import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,

      unique: true,
    },
    password: {
      type: String,
      required: true,
      default: "Tested2021",
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    //find algorithm for this

    isVerified: {
      type: String,
      default: "",
    },
    refresh: {
      type: String,
      default: "",
    },
    accountId: {
      type: mongoose.Number,
    },
    pin: {
      type: String,
      required: true,
      default: "1234",
      unique: false,
    },
    balance: {
      type: mongoose.Number,
      default: 0.0,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.isModified("pin")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  const pinSalt = await bcrypt.genSalt(4);
  this.password = await bcrypt.hash(this.password, salt);
  this.pin = await bcrypt.hash(this.pin, pinSalt);
});

const User = mongoose.model("User", userSchema);

export default User;
