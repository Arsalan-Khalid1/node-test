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
exports.connectToDb = void 0;
const mongoose_1 = require("mongoose");
const _1 = __importDefault(require("."));
const books_model_1 = __importDefault(require("../app/models/books.model"));
const seeds_1 = __importDefault(require("../app/seeds"));
const connectToDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, mongoose_1.connect)(_1.default.DB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        const books = yield books_model_1.default.find();
        if (books.length === 0) {
            let promiseToResolve = [];
            const booksToCreate = (0, seeds_1.default)();
            booksToCreate.forEach((book) => {
                promiseToResolve.push(books_model_1.default.create(book));
            });
            Promise.all(promiseToResolve).then((book) => {
            }).catch((err) => {
                console.log(err);
            });
        }
        console.log("database connection established");
    }
    catch (error) {
        console.log("error occured while connecting to DB", error);
        process.exit(1);
    }
});
exports.connectToDb = connectToDb;
