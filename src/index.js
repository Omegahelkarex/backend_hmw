// index.js
import express from "express";
import connectDb from "./db/dbconfig.js";
import "dotenv/config";
// const app = express();
import { app } from "./app.js";
// Define a route
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

connectDb();
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
