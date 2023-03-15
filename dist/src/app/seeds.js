"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const booksSeeder = () => {
    let books = [];
    const randomGenres = () => {
        let temp = [];
        for (let j = 0; j <= Math.random() * 3; j++) {
            temp.push(faker_1.faker.name.fullName());
        }
        return temp;
    };
    for (let i = 0; i < 50; i++) {
        let temp = randomGenres();
        books.push({
            title: faker_1.faker.lorem.words(),
            author: faker_1.faker.name.fullName(),
            published_at: faker_1.faker.date.past(),
            rating: faker_1.faker.random.numeric(1),
            description: faker_1.faker.lorem.sentences(),
            avatar: faker_1.faker.internet.avatar(),
            genres: temp
        });
    }
    return books;
};
exports.default = booksSeeder;
