import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

import cors from 'cors';

// Importing Model
import { Book } from "./models/book.model.js";

// Importing routes
import bookRouter from "./routes/books.route.js";

const port = process.env.PORT || 8000;

const app = express();
app.use(express.json());

// Allow all origins
app.use(cors());
// Allow custon origins
// app.use( cors({
//     origin: 'http://localhost:5173',
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
// }) );


app.use('/book', bookRouter);

app.get("/", (req, res) => {
    res.status(200).send("Home")
});


app.listen(port || 8000, () => {
    console.log(`App is running on ${port}`);
});

mongoose.connect( process.env.DB_URL )
    .then( () => {
        console.log("Database Connected");
    })
    .catch((error) => {
        console.log(error)
    });