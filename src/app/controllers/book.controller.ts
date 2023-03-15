import {  Response } from 'express';
import { BookDto, UpdateBookDto } from '../dtos/book.dto';
import Book from '../models/books.model';
import { BookService } from '../services/book.service';
import { IGetUserAuthInfoRequest, myCache } from '../../..';

const bookService = new BookService();

export default class BookController {
  static async create(req: IGetUserAuthInfoRequest, res: Response): Promise<Response> {
    const bookDto: BookDto = req.body;
    const book = await Book.create(bookDto);
    myCache.flushAll()
    return res.status(201).json({
      success: true,
      message: 'Book has been created successfully',
      data: book,
    });
  }

  static async update(req: IGetUserAuthInfoRequest, res: Response): Promise<Response> {
    const bookDto: UpdateBookDto = req.body;
    const book = await bookService.updateBook(bookDto, req.params.id);

    return res.status(200).json({
      success: true,
      message: 'Book has been updated successfully',
      data: book,
    });
  }

  static async index(req: IGetUserAuthInfoRequest, res: Response): Promise<Response> {
    const {books, totalPages } = await bookService.queryFilter(req.query)
    return res.status(200).json({
      success: true,
      message: 'Book has been pulled successfully',
      totalPages,
      data: books,
    });
  }

  static async show(req: IGetUserAuthInfoRequest, res: Response): Promise<Response> {
    const book = await Book.findOne({_id:req.params.id})
    if(!book)
    {
      throw new Error("Not Found")
    }
    return res.status(200).json({
      success: true,
      message: 'Book has been pulled successfully',
      data: book,
    });
  }

  static async delete(req: IGetUserAuthInfoRequest, res: Response): Promise<Response> {
    await Book.deleteOne({ _id: req.params.id })
    return res.status(200).json({
      success: true,
      message: 'Book has been delete successfully',
    });
  }

}
