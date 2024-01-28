import express from "express";
import { Book } from "../models/book.model.js";

const bookRouter = express.Router();

// Save a book to DB
bookRouter.post("/", async function(req, res) {

    try {
        
        if( !req.body.title || !req.body.author || !req.body.publishYear ) {
            return res.status(400).send({ Message: "Pass all the values" });
        }

        const {title, author, publishYear} = req.body;
        const newBook = {title, author, publishYear};

        const book = await Book.create(newBook);

        res.status(201).json({Msg: "Book saved successfully", book});

    } catch (error) {
        console.log(error.message);
        res.status(500).send({Message: error.message});
    }

});

// Get all books
bookRouter.get("/", async function(req, res) {

    try {
        const books = await Book.find({});

        res.status(201).json({count: books.length, data :books});

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }

});

// Get one book by id
bookRouter.get("/:id", async function(req, res) {

    try {
        
        const {id} = req.params;

        const book = await Book.findById(id);

        res.status(200).json({data: book});

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }

});


// Update book route
bookRouter.put("/:id", async function(req, res) {

    try {
        
        if( !req.body.title || !req.body.author || !req.body.publishYear ) {
            return res.status(401).send({ Message: "Pass all the values" });
        }

        const { id } = req.params;

        const result = await Book.findByIdAndUpdate(id, req.body);

        res.status(201).json({message: "Book updated Successfully", data: result});

    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }

});

// Delete a book route
bookRouter.delete("/:id", async function(req, res) {

    try {

        const {id} = req.params;

        const result = await Book.findByIdAndDelete(id);

        res.status(202).json({message: "Book deleted successfully"});

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }

});


export default bookRouter;