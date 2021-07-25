import path from "path";
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import transactionsRoute from "./routes/transactionsRoutes.js";
import otherRoutes from "./routes/otherRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import refreshTokenRoute from "./routes/tokenRoute.js";
import fs from "fs";

dotenv.config();

connectDB();

const app = express();
const __dirname = path.resolve();
console.log();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const router = express.Router();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
const apiVersion = process.env.API_VERSION;
app.use(apiVersion, otherRoutes);
app.use(apiVersion, userRoutes);
app.use(apiVersion, refreshTokenRoute);
app.use(apiVersion, transactionsRoute);
app.use(apiVersion, uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);
// app.get("*", (req, res) => {
//   res.send("API not found check github.....");
// });
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.use(notFound);

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
