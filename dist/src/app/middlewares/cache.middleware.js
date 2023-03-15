"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../..");
const cachedBooks = (req, res, next) => {
    if (!req.query) {
        const books = __1.myCache.get("books");
        const totalPages = __1.myCache.get("totalPages");
        if (books) {
            return res.status(200).json({
                success: true,
                message: "Book has been updated successfully",
                totalPages,
                data: books,
            });
        }
        else {
            next();
        }
    }
    else {
        const query = JSON.stringify(req.query);
        const books = __1.myCache.get(query);
        const totalPages = __1.myCache.get("totalPages");
        if (books) {
            return res.status(200).json({
                success: true,
                message: "Book has been updated successfully",
                totalPages,
                data: books,
            });
        }
        else {
            next();
        }
    }
};
exports.default = cachedBooks;
