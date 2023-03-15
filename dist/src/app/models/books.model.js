"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true, unique: true },
    published_at: { type: Date, required: true },
    author: { type: String, required: true },
    avatar: { type: String },
    genres: [{
            type: String,
            required: true
        }],
    rating: { type: Number, min: 0, max: 10, required: true }
});
const Book = (0, mongoose_1.model)('Book', bookSchema);
exports.default = Book;
