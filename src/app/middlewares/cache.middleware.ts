import { NextFunction, Response } from "express";
import { IGetUserAuthInfoRequest, myCache } from "../../..";

const cachedBooks = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.query) {
    const books = myCache.get("books");
    const totalPages = myCache.get("totalPages")
    if (books) {
      return res.status(200).json({
        success: true,
        message: "Book has been updated successfully",
        totalPages,
        data: books,
      });
    } else {
      next();
    }
  } else {
    const query = JSON.stringify(req.query);
    const books = myCache.get(query);
    const totalPages = myCache.get("totalPages")
    if (books) {
      return res.status(200).json({
        success: true,
        message: "Book has been updated successfully",
        totalPages,
        data: books,
      });
    } else {
      next();
    }
  }
};

export default cachedBooks;
