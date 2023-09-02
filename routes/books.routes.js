import { Router } from 'express'

import * as booksController from '../controllers/books.controller.js'
import { validateBook } from '../gateways/validators/books.validator.js'

const booksRouter = Router()


booksRouter.get('/', booksController.getAllBooks)

booksRouter.get('/:id', booksController.getBook)

booksRouter.post('/', validateBook, booksController.createBook)

booksRouter.put('/:id', validateBook, booksController.updateBook)

booksRouter.delete('/:id', booksController.deleteBook)

export default booksRouter;