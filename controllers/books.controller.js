import * as booksRepository from '../repositories/books.repository.js'

export async function getAllBooks(req, res) {
    res.json(await booksRepository.getAllBooks())
}

export async function getBook(req, res) {
    const id = parseInt(req.params.id)
    const book = await booksRepository.getBook(id)
    
    if (!book) {
        res.status(404).send("Sos un pelotudo")
    } else {
        res.json(book)
    }
}

export async function createBook(req, res) {
    const newBook = await booksRepository.createBook(req.body)
    res.status(201).json(newBook)
}

export async function updateBook(req, res) {
    const payload = req.body
    payload.id = parseInt(req.params.id)

    const updatedBook = await booksRepository.updateBook(payload)

    if (updatedBook) {
        res.status(202).json(updatedBook);
    } else {
        res.status(404).send("Not found");
    }
}


export async function deleteBook(req, res){
    const id = parseInt(req.params.id)
    const deletedBook = await booksRepository.deleteBook(id)

    if (deletedBook) {
        res.status(204).json(deletedBook)
    } else {
        res.status(404).send("Not found")
    } 
}