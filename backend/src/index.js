import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"; // To be able to grab the token from the cookie
import cors from "cors";

import path from "path";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

//const app = express(); Removing as created one in socket.js
const PORT = process.env.PORT;
const __dirname = path.resolve();
//app.use(express.json()); // Middleware to allow extracting the json data from the body
// PayloadTooLargeError: request entity too large // as by default, max limit is 100kb, which is kinda small for images
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser()); // Allows us to parse the cookie
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});
