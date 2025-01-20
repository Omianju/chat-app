import express from "express";
import http from "http";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();

app.use(cors({
  origin : "http://localhost:5173",
  credentials : true
}))

app.use(express.json()); // This will allow us to extract json data from the body
app.use(cookieParser()); // To parse the value of the cookie

app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
  connectDB();
});
