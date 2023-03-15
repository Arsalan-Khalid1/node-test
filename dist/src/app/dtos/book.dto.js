"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBookDto = exports.BookDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class BookDto {
    constructor(title, description, rating, published_at, author, genres, avatar) {
        this.title = title;
        this.description = description;
        this.rating = rating;
        this.published_at = published_at;
        this.author = author;
        this.genres = genres;
        this.avatar = avatar;
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.IsNotEmpty)()
], BookDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.IsNotEmpty)()
], BookDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(10)
], BookDto.prototype, "rating", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Transform)(({ value }) => value && new Date(value)),
    (0, class_validator_1.IsNotEmpty)()
], BookDto.prototype, "published_at", void 0);
__decorate([
    (0, class_validator_1.IsString)()
], BookDto.prototype, "avatar", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)()
], BookDto.prototype, "author", void 0);
__decorate([
    (0, class_validator_1.ArrayNotEmpty)()
], BookDto.prototype, "genres", void 0);
exports.BookDto = BookDto;
class UpdateBookDto {
    constructor(title, description, rating, published_at, author, genres, avatar) {
        this.title = title;
        this.description = description;
        this.rating = rating;
        this.published_at = published_at;
        this.author = author;
        this.genres = genres;
        this.avatar = avatar;
    }
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5)
], UpdateBookDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5)
], UpdateBookDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(10)
], UpdateBookDto.prototype, "rating", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Transform)(({ value }) => value && new Date(value))
], UpdateBookDto.prototype, "published_at", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)()
], UpdateBookDto.prototype, "avatar", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)()
], UpdateBookDto.prototype, "author", void 0);
__decorate([
    (0, class_validator_1.IsOptional)()
], UpdateBookDto.prototype, "genres", void 0);
exports.UpdateBookDto = UpdateBookDto;
