import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { User, validate } from "./models/User.js";
import bcrypt from "bcryptjs";
import passwordReset from "./routes/passwordReset.js";
import users from "./routes/users.js";
import { connection } from "./db.js";
// const connection = require("./db");
const app = express();
app.use(express.json());

app.use(cors({ origin: "*" }));
// Load environment variables
dotenv.config();

const PORT = process.env.PORT;
// Connect to MongoDB
// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => {
//     console.log("Connected to DB");
//   })
//   .catch((err) => {
//     console.error("Failed to connect to DB:", err);
//   });
connection();

app.use("/api/password-reset", passwordReset);
app.use("/api/users", users);

app.get("/", (req, res) => {
  res.send({ status: "started" });
});

// post request

// Example route for user registration
app.post("/register", async (req, res) => {
  try {
    const { username, email, password, phoneNumber } = req.body;

    // Validate the input
    if (!username || !email || !password || !phoneNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: encryptedPassword,
      phoneNumber,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during user registration:", error); // Log the error for debugging
    res.status(500).json({ message: "Error registering user", error });
  }
});
// login part
//login handle
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserInfo.findOne({ email });
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        return res.json({ message: "Success" });
      } else {
        return res.status(401).json({ message: "Incorrect Password" });
      }
    } else {
      return res.status(404).json({ message: "No records exist" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Error logging in", error });
  }
});
// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
