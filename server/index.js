import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "../server/routes/user.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/api/user", userRoutes);
