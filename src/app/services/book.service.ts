import { myCache } from "../../..";
import { UpdateBookDto } from "../dtos/book.dto";
import Book from "../models/books.model";

export class BookService {
  async queryFilter(reqQuery: any) {
    if(reqQuery)
    {
      const queryObj = {...reqQuery};
    const excludedField = ["fields", "sort", "limit", "page"]
    excludedField.forEach((e) => delete queryObj[e])
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
    let query = Book.find(JSON.parse(queryStr))

    if(reqQuery.sort)
    {
      const sortBy = reqQuery.sort.split(",").join(" ");
      query = query.sort(sortBy)
    }
    else
    {
      query = query.sort('-createdAt')
    }
    
    const page = reqQuery.page * 1 || 1;
    const limit = reqQuery.limit * 1 || 10;
    const skip = (page - 1)  * limit;
    
    const bookCount = await Book.countDocuments();
    
    if(reqQuery.page)
    {
      if(skip >= bookCount)
      {
        throw new Error("This page does not exists")
      }

    }
    query = query.limit(limit).skip(skip);
    const books = await query;
    const totalPages = Math.ceil(bookCount / limit)
    if(books.length > 0) {
      myCache.set(JSON.stringify(reqQuery), books)
      myCache.set("totalPages", totalPages)
    }
    return { books, totalPages }
    }
    else
    {
      const books = await Book.find()
      const bookCount = await Book.countDocuments()
      const totalPages = Math.ceil(bookCount / 1)
    if(books.length > 0) {
      myCache.set(JSON.stringify(reqQuery), books)
      myCache.set("totalPages", totalPages)
    }
      return { books, totalPages }
    }
  }

  async updateBook(updateBookDto: UpdateBookDto, id: string) {
    let book: any = await Book.findById(id)
    if(book)
    {
      const changes: any = {};
        let hasChanges = false;
      for (const [field, value] of Object.entries(updateBookDto)) {
            if (field === '_id' || value === book[field] || field === "__v") continue;
            hasChanges = true;
            changes[field] = value;
        }

        if(!hasChanges)
        {
          throw new Error("No changes")
        }
        else
        {
          const updatedBook = await Book.findByIdAndUpdate(id, changes, {new: true})
          myCache.flushAll()
          return updatedBook;
        }
    }
    else
    {
      throw new Error("Not Found")
    }
  }
}
