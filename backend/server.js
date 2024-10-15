import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

// Load environment variables
dotenv.config();

const PORT = process.env.PORT;
// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.error("Failed to connect to DB:", err);
  });

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
