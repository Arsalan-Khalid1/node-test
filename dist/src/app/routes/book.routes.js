"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dto_middleware_1 = __importDefault(require("../middlewares/dto.middleware"));
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const book_controller_1 = __importDefault(require("../controllers/book.controller"));
const book_dto_1 = require("../dtos/book.dto");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const cache_middleware_1 = __importDefault(require("../middlewares/cache.middleware"));
const bookRouter = express_1.default.Router();
bookRouter.post("/", (0, asyncHandler_1.default)(auth_middleware_1.default), (0, dto_middleware_1.default)(book_dto_1.BookDto), (0, asyncHandler_1.default)(book_controller_1.default.create));
bookRouter.patch("/:id", (0, asyncHandler_1.default)(auth_middleware_1.default), (0, dto_middleware_1.default)(book_dto_1.UpdateBookDto), (0, asyncHandler_1.default)(book_controller_1.default.update));
bookRouter.get("/:id", (0, asyncHandler_1.default)(auth_middleware_1.default), (0, asyncHandler_1.default)(book_controller_1.default.show));
bookRouter.delete("/:id", (0, asyncHandler_1.default)(auth_middleware_1.default), (0, asyncHandler_1.default)(book_controller_1.default.delete));
bookRouter.get("/", (0, asyncHandler_1.default)(auth_middleware_1.default), (0, asyncHandler_1.default)(cache_middleware_1.default), (0, asyncHandler_1.default)(book_controller_1.default.index));
exports.default = bookRouter;
