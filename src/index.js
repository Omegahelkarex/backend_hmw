// index.js
import express from "express";
import connectDb from "./db/dbconfig.js";
import "dotenv/config"
const app = express();
const PORT = process.env.PORT || 3000;

// Define a route
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
connectDb();

