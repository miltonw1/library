import { Router } from 'express'

import booksController from '../controllers/books.controller.js'
import { validateBook } from '../gateways/validators/books.validator.js'
import booksRepository from '../repositories/books.repository.js'


function makeBooksRouter(db) {
    const booksRouter = Router()
    

    const repository = booksRepository(db)
    const controller = booksController(repository)
    


    booksRouter.get('/', controller.getAllBooks)
    
    booksRouter.get('/:id', controller.getBook)
    
    booksRouter.post('/', validateBook, controller.createBook)
    
    booksRouter.put('/:id', validateBook, controller.updateBook)
    
    booksRouter.delete('/:id', controller.deleteBook)

    return booksRouter
}

export default makeBooksRouter;
