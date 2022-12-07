import dotenv from "dotenv";
dotenv.config();

import connectToDB from "./database.js";
connectToDB();
import express from "express";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
import cors from "cors";
import router from "./routes/userRouter.js";
import cookieParser from "cookie-parser";
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

// import swaggerUi from "swagger-ui-express";
// import swaggerDocument from "./swagger.json";
// import swaggerDocument from "./swagger.json" assert { type: "json" };

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// custom middleware
app.use("/", router);

export default app;
