import { Router } from 'express'

import * as borrowsController from '../controllers/borrows.controller.js'
// import { validateBorrow } from '../gateways/validators/borrows.validator.js'

const borrowsRouter = Router()

borrowsRouter.get('/', borrowsController.getAllBorrows)

borrowsRouter.get('/:id', borrowsController.getBorrowByUser)

// borrowsRouter.get('/:id', borrowsController.getBorrow)

// borrowsRouter.post('/', validateBorrow, borrowsController.createBorrow)

// borrowsRouter.post('/:id', validateBorrow, borrowsController.endBorrow)

export default borrowsRouter;