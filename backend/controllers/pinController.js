import { json } from "express";
import asyncHandler from "express-async-handler";
import Pin from "../models/pinModel.js";
import { decript, hash } from "../utils/hasher.js";
const createPin = asyncHandler(async (req, res) => {
  // simple encoding
  //pin algorithm

  // pin
  const { _id } = req.user;
  const { pin } = req.body;
  const pinDb = await Pin.findOne({ userId: _id });
  if (pinDb) res.json("Pin already created!!");
  else if (pin && pin.toString().length === 4) {
    // let newpin = "";
    // for (let i = 0; i < pin.length; i++) {
    //   newpin = newpin + Math.random().toString().substr(4, 4);
    // }
    // console.log(newpin);
    console.log(pin);
    const newPin = await Pin.create({
      userId: _id,
      pin: await hash(4, pin),
    });
    res.json(newPin);
  } else {
    res.status(400).json("Invalid parameter");
  }
});
const verifyPin = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const bodyPin = req.body.pin;
  const pinDb = await Pin.findOne({ userId: _id });
  if (pinDb && (await decript(bodyPin, pinDb.pin))) {
    res.json({ pin: bodyPin });
  } else {
    res.status(400).json({ error: "Pin not found!" });
  }
});
const getPin = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const pinDb = await Pin.findOne({ userId: _id });
  if (pinDb) {
    res.json({ message: "Pin is found" });
  } else {
    res.status(400).json({ error: "Pin not found!" });
  }
});
const changePin = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { pin } = req.body;
  const newPin = await Pin.findOne({
    userId: _id,
  });
  console.log(pin);
  if (!pin) return res.status(400).json({ error: "Invalid parameter" });

  try {
    if (newPin) {
      newPin.pin = await hash(4, pin);
      await newPin.save();
      res.json("pin changed !!");
    }
  } catch (error) {
    res.json(error.message);
  }
});
const deletePins = asyncHandler(async (req, res) => {
  await Pin.deleteMany({});
  res.json("Pins Deleted!!");
});
export { createPin, getPin, changePin, deletePins, verifyPin };
