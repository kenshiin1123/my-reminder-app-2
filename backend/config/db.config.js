import mongoose from "mongoose";

const connectDB = () => {
  mongoose.connect("mongodb://127.0.0.1:27017/reminder-app-2");
  mongoose.connection.on("error", console.error.bind("Connection Error"));
  mongoose.connection.once("open", () => {
    console.log("Mongodb Connected!");
  });
};

export default connectDB;
