const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

// TODO: checnk id cors() is actually needed
app.use(bodyParser.json(), cors());

var BOOKS = require("./data/books");
var GENRES = require("./data/genres");

var books = {};
var genres = [];
var booksCounter = 0;

if (BOOKS && Object.keys(BOOKS).length > 0) {
    books = BOOKS;
    booksCounter = Object.keys(books).length;
}

if (GENRES && GENRES.length > 0) {
    genres = GENRES;
}

app.get("/books", (req, res, next) => {
    res.json(BOOKS);
});

app.get("/books/:bookId", (req, res, next) => {
    const bookId = req.params.bookId;
    const book = books[bookId];

    if (book) {
        res.json(book);
    } else {
        res.status(404);
        res.json({ message: "Book not found" });
    }
});

app.post("/books", (req, res, next) => {
    console.log('Incoming book data', req.body);

    const isGenreValid = validateGenre(req.body.genre);
    const isFullNameValid = validateFullName(req.body.author);

    if (isGenreValid && isFullNameValid) {
        booksCounter = booksCounter + 1;
        const newId = 'b' + booksCounter;
        books[newId] = req.body;

        res.status(200);
        res.json(newId);
    } else {
        res.status(400);

        if (!isGenreValid) {
            res.json({ message: "Invalid genre", field: "genre" });
        } else {
            if (!isFullNameValid) {
                res.json({ message: "Invalid author name", field: "author" });
            }
        }
    }
});

app.put("/books/:id", (req, res, next) => {
    const bookId = req.params.id;
    console.log('Incoming book data change for', bookId, req.body);
    const book = books[bookId];
    const isGenreValid = validateGenre(req.body.genre);
    const isFullNameValid = validateFullName(req.body.author);

    if (book && isGenreValid && isFullNameValid) {
        books[bookId] = req.body;

        res.status(200);
        res.json(bookId);
    } else {
        if (!book) {
            res.status(404);
            res.json({ message: "Book not found" });
        } else {
            res.status(400);

            if (!isGenreValid) {
                res.json({ message: "Invalid genre", field: "genre" });
            } else {
                if (!isFullNameValid) {
                    res.json({ message: "Invalid author name", field: "author" });
                }
            }
        }
    }
});

app.delete("/books/:id", (req, res, next) => {
    const bookId = req.params.id;
    console.log('Deleting book', bookId);
    const book = books[bookId];

    if (book) {
        delete books[bookId];
        res.status(200);
        res.end();
    } else {
        res.status(404);
        res.json({ message: "Book not found" });
    }
});

app.get("/genres", (req, res, next) => {
    res.json(GENRES);
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

function validateGenre(genre) {
    return GENRES.includes(genre);
}

function validateFullName(value) {
    return value.trim().indexOf(' ') > 0;
}