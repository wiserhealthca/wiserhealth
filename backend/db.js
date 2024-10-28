import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
const app = express();
app.use(express.json());

// app.use(cors({ origin: "*" }));
// Load environment variables
dotenv.config();

export const connection = async () => {
  try {
    const connectionParams = {
      useNewUrlParser: true,
      //   useCreateIndex: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect(process.env.MONGODB_URI, connectionParams);
    console.log("connected to database.");
  } catch (error) {
    console.log(error, "could not connect database.");
  }
};
