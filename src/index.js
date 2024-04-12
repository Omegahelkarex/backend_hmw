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

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
connectDb()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`The server is running at port : ${process.env.PORT}`);
    })
})

.catch((err) => {
    console.log("Mongo DB connection failed ", err);

})





