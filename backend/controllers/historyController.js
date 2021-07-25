import History from "../models/historyModel.js";
import moment from "moment";
import expressAsyncHandler from "express-async-handler";

export const createHistoryController = async ({
  userId,
  type,
  amount,
  balance,
  receiverName,
  receiverId,
}) => {
  const date = moment().format("DD/MM/YYYY");
  const time = moment().format("h:mma");
  //send and receive => type
  let message;
  if (type === "send")
    message = JSON.stringify({
      message: "Money send",
      receiver: { name: receiverName, id: receiverId },
    });
  else if (type === "receive")
    message = JSON.stringify({
      message: "Money receive",
      sender: { name: receiverName, id: receiverId },
    });

  const history = await History.create({
    userId,
    amount,
    message,
    time: { date, time },
    balance,
    receipientName: receiverName,
    receipientId: receiverId,
  });

  return "success";
};
export const getHistoryController = expressAsyncHandler(async (req, res) => {
  const userId = req.user._id;
  const history = await History.find({ userId });
  res.json(history);
});
