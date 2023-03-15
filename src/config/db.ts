import { ConnectOptions, connect } from "mongoose";
import config from ".";
import Book from "../app/models/books.model";
import booksSeeder from "../app/seeds";

export const connectToDb = async () => {
     try {
        await connect(config.DB_URL,{
        useUnifiedTopology: true,
        useNewUrlParser: true,
    } as ConnectOptions)
        const books = await Book.find()
        if(books.length === 0)
        {
            let promiseToResolve: any = []
            const booksToCreate = booksSeeder();
            booksToCreate.forEach((book: any) => {
                promiseToResolve.push(Book.create(book))
            })

            Promise.all(promiseToResolve).then((book) => {
            }).catch((err) => {
                console.log(err)
            })
        }
        console.log("database connection established");
     } catch (error) {
        console.log("error occured while connecting to DB", error);
        process.exit(1);
     }
}