import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { createHistoryController } from "./historyController.js";
export const sendMoneyController = asyncHandler(async (req, res) => {
  let { amount, receiverId } = req.body;
  const user = await User.findOne({ email: req.user.email });
  const { balance } = user;
  const receivingUser = await User.findOne({ accountId: receiverId });
  console.log(user);
  amount = Number(amount);
  if (receivingUser && user.email !== receivingUser.email) {
    if (amount <= balance) {
      user.balance -= amount;

      receivingUser.balance += amount;
      await user.save();
      await receivingUser.save();
      createHistoryController(user._id, "send", amount, user.balance);
      createHistoryController(
        receivingUser._id,
        "receive",
        amount,
        receivingUser.balance
      );
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
  console.log(req.user);
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
