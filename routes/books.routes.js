import { Router } from 'express'

import BooksRepository from '../repositories/books.repository.js'
import CopiesRepository from '../repositories/copies.repository.js'
import { validateBook } from '../gateways/validators/books.validator.js'
import { validateCopy } from '../gateways/validators/copies.validator.js'
import BooksController from '../controllers/books.controller.js'
import CopiesController from '../controllers/copies.controller.js'

function makeBooksRouter(db) {
    const booksRouter = Router()
    

    const booksRepository = BooksRepository(db)
    const booksController = BooksController(booksRepository)
    
    const copiesRepository = CopiesRepository(db)
    const copiesController = CopiesController(copiesRepository)


    booksRouter.get('/', booksController.getAllBooks)
    booksRouter.get('/:id', booksController.getBook)
    booksRouter.post('/', validateBook, booksController.createBook)
    booksRouter.put('/:id', validateBook, booksController.updateBook)
    booksRouter.delete('/:id', booksController.deleteBook)

    booksRouter.get('/:book_id/copies', copiesController.getAllCopies)
    booksRouter.get('/:book_id/copies/:id', copiesController.getCopy)
    booksRouter.post('/:book_id/copies', copiesController.createCopy)
    booksRouter.put('/:book_id/copies/:id', validateCopy, copiesController.updateCopy)
    booksRouter.delete('/:book_id/copies/:id', copiesController.deleteCopy)

    return booksRouter
}

export default makeBooksRouter;
