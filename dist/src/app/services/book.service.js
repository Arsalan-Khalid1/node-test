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
exports.BookService = void 0;
const __1 = require("../../..");
const books_model_1 = __importDefault(require("../models/books.model"));
class BookService {
    queryFilter(reqQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            if (reqQuery) {
                const queryObj = Object.assign({}, reqQuery);
                const excludedField = ["fields", "sort", "limit", "page"];
                excludedField.forEach((e) => delete queryObj[e]);
                let queryStr = JSON.stringify(queryObj);
                queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
                let query = books_model_1.default.find(JSON.parse(queryStr));
                if (reqQuery.sort) {
                    const sortBy = reqQuery.sort.split(",").join(" ");
                    query = query.sort(sortBy);
                }
                else {
                    query = query.sort('-createdAt');
                }
                const page = reqQuery.page * 1 || 1;
                const limit = reqQuery.limit * 1 || 10;
                const skip = (page - 1) * limit;
                const bookCount = yield books_model_1.default.countDocuments();
                if (reqQuery.page) {
                    if (skip >= bookCount) {
                        throw new Error("This page does not exists");
                    }
                }
                query = query.limit(limit).skip(skip);
                const books = yield query;
                const totalPages = Math.ceil(bookCount / limit);
                if (books.length > 0) {
                    __1.myCache.set(JSON.stringify(reqQuery), books);
                    __1.myCache.set("totalPages", totalPages);
                }
                return { books, totalPages };
            }
            else {
                const books = yield books_model_1.default.find();
                const bookCount = yield books_model_1.default.countDocuments();
                const totalPages = Math.ceil(bookCount / 1);
                if (books.length > 0) {
                    __1.myCache.set(JSON.stringify(reqQuery), books);
                    __1.myCache.set("totalPages", totalPages);
                }
                return { books, totalPages };
            }
        });
    }
    updateBook(updateBookDto, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let book = yield books_model_1.default.findById(id);
            if (book) {
                const changes = {};
                let hasChanges = false;
                for (const [field, value] of Object.entries(updateBookDto)) {
                    if (field === '_id' || value === book[field] || field === "__v")
                        continue;
                    hasChanges = true;
                    changes[field] = value;
                }
                if (!hasChanges) {
                    throw new Error("No changes");
                }
                else {
                    const updatedBook = yield books_model_1.default.findByIdAndUpdate(id, changes, { new: true });
                    __1.myCache.flushAll();
                    return updatedBook;
                }
            }
            else {
                throw new Error("Not Found");
            }
        });
    }
}
exports.BookService = BookService;
