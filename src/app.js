import express, { urlencoded } from "express";
import cors from "cors";
import cookieparser from "cookie-parser";
import "dotenv/config";
const app = express();
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(
  cors({
    origin: [process.env.USER_FRONTEND, process.env.HOSPITAL_FRONTEND],
    credentials: true,
  })
);
app.use(express.static("public"));
app.use(cookieparser());

// routes

import userRouter from "./routes/User.router.js";
import hospitalRouter from "./routes/Hospital.router.js";
import { errorHandle } from "./utils/errorHandle.js";

// routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/hospitals", hospitalRouter);
app.use(errorHandle);

export { app };
