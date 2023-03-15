import { IsString, MinLength, IsNotEmpty, ArrayNotEmpty, IsDate, IsOptional, IsNumber, Min, Max } from "class-validator";
import { Transform } from "class-transformer";

export class BookDto {
  @IsString()
  @MinLength(5)
  @IsNotEmpty()
  title: string;

  @IsString()
  @MinLength(5)
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(0)
  @Max(10)
  rating: number;

  @IsDate()
  @Transform( ({ value }) => value && new Date(value))
  @IsNotEmpty()
  published_at: Date;

  @IsString()
  avatar?: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @ArrayNotEmpty()
  genres: string[];

  constructor(
    title: string,
    description: string,
    rating: number,
    published_at: Date,
    author: string,
    genres: string[],
    avatar?: string,
  ) {
    this.title = title;
    this.description = description;
    this.rating = rating;
    this.published_at = published_at;
    this.author = author;
    this.genres = genres;
    this.avatar = avatar
  }
}

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  @MinLength(5)
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(10)
  rating?: number;

  @IsOptional()
  @IsDate()
  @Transform( ({ value }) => value && new Date(value))
  published_at?: Date;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  genres?: string[];

  constructor(
    title?: string,
    description?: string,
    rating?: number,
    published_at?: Date,
    author?: string,
    genres?: string[],
    avatar?: string,
  ) {
    this.title = title;
    this.description = description;
    this.rating = rating;
    this.published_at = published_at;
    this.author = author;
    this.genres = genres;
    this.avatar = avatar
  }
}
