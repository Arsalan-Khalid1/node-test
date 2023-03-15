import express from "express";
import dtoValidationMiddleware from "../middlewares/dto.middleware";
import asyncHandler from "../utils/asyncHandler";
import BookController from "../controllers/book.controller";
import { BookDto, UpdateBookDto } from "../dtos/book.dto";
import isAuthenticated from "../middlewares/auth.middleware";
import cachedBooks from "../middlewares/cache.middleware";

const bookRouter = express.Router();

bookRouter.post("/", asyncHandler(isAuthenticated), dtoValidationMiddleware(BookDto), asyncHandler(BookController.create));
bookRouter.patch("/:id", asyncHandler(isAuthenticated), dtoValidationMiddleware(UpdateBookDto), asyncHandler(BookController.update));
bookRouter.get("/:id", asyncHandler(isAuthenticated), asyncHandler(BookController.show));
bookRouter.delete("/:id", asyncHandler(isAuthenticated), asyncHandler(BookController.delete));
bookRouter.get("/", asyncHandler(isAuthenticated), asyncHandler(cachedBooks), asyncHandler(BookController.index));

export default bookRouter;