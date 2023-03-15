"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const books_model_1 = __importDefault(require("../models/books.model"));
const book_service_1 = require("../services/book.service");
const __1 = require("../../..");
const bookService = new book_service_1.BookService();
class BookController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const bookDto = req.body;
            const book = yield books_model_1.default.create(bookDto);
            __1.myCache.flushAll();
            return res.status(201).json({
                success: true,
                message: 'Book has been created successfully',
                data: book,
            });
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const bookDto = req.body;
            const book = yield bookService.updateBook(bookDto, req.params.id);
            return res.status(200).json({
                success: true,
                message: 'Book has been updated successfully',
                data: book,
            });
        });
    }
    static index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { books, totalPages } = yield bookService.queryFilter(req.query);
            return res.status(200).json({
                success: true,
                message: 'Book has been pulled successfully',
                totalPages,
                data: books,
            });
        });
    }
    static show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = yield books_model_1.default.findOne({ _id: req.params.id });
            if (!book) {
                throw new Error("Not Found");
            }
            return res.status(200).json({
                success: true,
                message: 'Book has been pulled successfully',
                data: book,
            });
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield books_model_1.default.deleteOne({ _id: req.params.id });
            return res.status(200).json({
                success: true,
                message: 'Book has been delete successfully',
            });
        });
    }
}
exports.default = BookController;
