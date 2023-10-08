import { Router } from 'express'

import BorrowsController from '../controllers/borrows.controller.js'
import BorrowsRepository from '../repositories/borrows.repository.js'
// import { validateBorrow } from '../gateways/validators/borrows.validator.js'


function makeBorrowsRouter(db) {
    const borrowsRouter = Router()


    const borrowsRepository = BorrowsRepository(db)
    const borrowsController = BorrowsController(borrowsRepository)

    borrowsRouter.post('/', borrowsController.createBorrow)
    borrowsRouter.get('/pending', borrowsController.getPendingBorrows)
    borrowsRouter.get('/by_user/:user_id', borrowsController.getBorrowsByUser)
    borrowsRouter.get('/by_book/:book_id', borrowsController.getBorrowsByBook)
    // borrowsRouter.put('/return')

    return borrowsRouter
}
export default makeBorrowsRouter;