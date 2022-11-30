import dotenv from "dotenv";
dotenv.config();

import connectToDB from "./database.js";
connectToDB();

import express from "express";
import cors from "cors";
import router from "./routes/userRouter.js";
import cookieParser from "cookie-parser";

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// custom middleware
app.use("/", router);

export default app;
