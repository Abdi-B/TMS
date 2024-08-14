import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(cookieParser());

// CORS configuration
const whitelist = [
  "http://localhost:3000",
  "http://localhost:4000",
  "http://10.1.177.21:4000",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle pre-flight requests (OPTIONS)
app.options("*", cors(corsOptions));

// Middleware to parse JSON
app.use(express.json());

import authRoute from "./Routes/authRoute.js";
import commandRoute from "./Routes/commandRoute.js";
import terminalRoute from "./Routes/terminalRoute.js";
import portRoute from "./Routes/portRoute.js";
import searchRoute from "./Routes/searchRoute.js";
import logRoute from "./Routes/logRoute.js";
// Connect to MongoDB and start the server
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `MongoDB connected and Listening on port ${process.env.PORT}`
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Define routes
app.use("/auth", authRoute);
app.use("/command", commandRoute);
app.use("/terminal", terminalRoute);
app.use("/port", portRoute);
app.use("/search", searchRoute);
app.use("/log", logRoute);
