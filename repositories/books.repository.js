import fs from 'fs/promises';
import path from 'path';

const file = path.join('repositories', 'books.json')

export async function getAllBooks() {
    const books = await fs.readFile(file)
    return JSON.parse(books)
}

export async function getBook(id) {
    const books = await getAllBooks()
    return books.find((book)=> book.id === id)
}

export async function updateBook(payload) {
    let books = await getAllBooks()

    const index = books.findIndex((book) => book.id === payload.id)

    if (index === -1) {
        return undefined
    }

    books[index] = payload

    await fs.writeFile(file, JSON.stringify(books, null, 4))
    return payload;
}

export async function createBook(payload) {

    let books = await getAllBooks()
    const id = books.length + 1;
    
    const newBook = {...payload, id}

    books.push(newBook)


    await fs.writeFile(file, JSON.stringify(books, null, 4))
    return newBook;
}

export async function deleteBook(id) {
    let books = await getAllBooks();

    const index = books.findIndex((book) => book.id === id)

    if (index === -1) {
        return undefined
    }

    const deletedBooks = books.splice(index, 1)

    await fs.writeFile(file, JSON.stringify(books, null, 4))
    return deletedBooks[0]
}
