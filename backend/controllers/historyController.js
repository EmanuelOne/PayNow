import History from "../models/historyModel.js";
import moment from "moment";
import expressAsyncHandler from "express-async-handler";

export const createHistoryController = async (userId, type, value, balance) => {
  const date = moment().format("DD/MM/YYYY");
  const time = moment().format("h:mma");
  //send and receive => type
  const message = type === "send" ? "Money Sent" : "Money received";

  const history = await History.create({
    userId,
    value,
    message,
    time: { date, time },
    balance,
  });
  return "success";
};
export const getHistoryController = expressAsyncHandler(async (req, res) => {
  const userId = req.user._id;
  const history = await History.find({ userId });
  res.json(history);
});
