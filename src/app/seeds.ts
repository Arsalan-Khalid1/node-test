import Book from "./models/books.model"
import { faker } from "@faker-js/faker";

const booksSeeder = () => {
    let books: any = []

   const randomGenres =  () => {
                let temp: any = [];
                for(let j = 0; j <= Math.random() * 3; j++ )
                {
                    temp.push(faker.name.fullName())
                }
                return temp;
            }

    for(let i = 0; i < 50; i++)
    {
        let temp = randomGenres()
        books.push({
            title: faker.lorem.words(),
            author: faker.name.fullName(),
            published_at: faker.date.past(),
            rating: faker.random.numeric(1),
            description: faker.lorem.sentences(),
            avatar: faker.internet.avatar(),
            genres: temp
        })
    }
    return books
}

export default booksSeeder;