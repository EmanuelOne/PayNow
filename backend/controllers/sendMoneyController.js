import asyncHandler from "express-async-handler";
import Pin from "../models/pinModel.js";
import User from "../models/userModel.js";
import { decript } from "../utils/hasher.js";
import { createHistoryController } from "./historyController.js";
export const sendMoneyController = asyncHandler(async (req, res) => {
  let { amount, receiverId, pin } = req.body;
  const user = await User.findOne({ email: req.user.email });
  const { balance } = user;
  const receivingUser = await User.findOne({ accountId: receiverId });
  if (!user) return res.status(400).json("Error please try again");
  const userPin = await Pin.findOne({ userId: user._id });
  // console.log(user);
  if (userPin === null) return res.status(400).json("Pin not created");
  else if (!pin) return res.status(400).json("Pin is required");
  else if (!(await decript(pin, userPin.pin)))
    return res.status(400).json("Pin does not match");
  else if (receivingUser === null)
    return res.status(400).json("User not found");
  else if (receivingUser.accountId === user.accountId)
    return res.status(400).json("User cannot send to themselves");
  else if (!amount) return res.status(400).json("Amount is required");
  // console.log(userPin);

  amount = Number(amount);
  if (receivingUser && user.email !== receivingUser.email) {
    if (amount <= balance) {
      user.balance -= amount;

      receivingUser.balance += amount;
      await user.save();
      await receivingUser.save();
      await createHistoryController({
        type: "send",
        amount: amount,
        userId: user._id,
        receiverName: receivingUser.name,
        receiverId: receivingUser._id,
        balance: user.balance,
      });
      await createHistoryController({
        type: "receive",
        amount: amount,
        userId: receivingUser._id,
        balance: receivingUser.balance,
        receiverName: user.name,
        receiverId: user._id,
      });
      res.json(`${amount} sent Successfully`);
    } else {
      res.status(400).json("In sufficient Funds");
    }
  } else {
    res.status(400).json("Receiver not found");
  }
});

export const getReceiverInfoContoller = asyncHandler(async (req, res) => {
  const { receiverId } = req.body;
  // console.log(req.user);
  // console.log(receiverId);
  const receivingUser = await User.findOne({ accountId: receiverId });
  if (receivingUser && receivingUser.email === req.user.email)
    res.status(400).json("You cannot send money to your self");
  else if (receivingUser) {
    res.json({
      name: receivingUser.name,
      email: receivingUser.email,
      accountId: receivingUser.accountId,
      balance: receivingUser.balance,
    });
  } else res.status(400).json("Receiver not found");
});
