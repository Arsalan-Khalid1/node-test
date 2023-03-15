import { Schema, model } from 'mongoose';

interface IBook {
  title: string;
  description: string;
  rating: number;
  published_at: Date;
  avatar?: string;
  author: string;
  genres: string[]
}

const bookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  description: { type: String, required: true, unique: true },
  published_at: { type: Date, required: true },
  author: { type: String, required: true },
  avatar: { type: String },
  genres: [ {
    type: String,
    required: true
  } ] ,
  rating: { type: Number, min: 0, max: 10, required: true }
});

const Book = model<IBook>('Book', bookSchema);

export default Book;