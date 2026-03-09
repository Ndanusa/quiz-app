import mongoose from "mongoose";
import { PORT, DB_URI, NODE_ENV } from "../config/env.js";

if (!DB_URI) {
  throw new Error(
    "you need to specify the environment variable for the database",
  );
}

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("Database Connected!");
  } catch (error) {
    console.log("Error connecting to database: " + error);
    process.exit(1);
  }
};

export default connectDB;
