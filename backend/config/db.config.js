import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const connectDB = () => {
  mongoose.connect(MONGO_URI);
  mongoose.connection.on("error", console.error.bind("Connection Error"));
  mongoose.connection.once("open", () => {
    console.log("Mongodb Connected!");
  });
};

export default connectDB;
