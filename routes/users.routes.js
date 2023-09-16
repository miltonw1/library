import { Router } from 'express'

import usersController from '../controllers/users.controller.js'
import { validateUser } from '../gateways/validators/users.validator.js'
import usersRepository from '../repositories/users.repository.js'


function makeUsersRouter(db) {
    const usersRouter = Router()

    const repository = usersRepository(db)
    const controller = usersController(repository)

    usersRouter.get('/', controller.getAllUsers)

    usersRouter.get('/:id', controller.getUser)

    usersRouter.post('/', validateUser, controller.createUser)

    usersRouter.put('/:id', validateUser, controller.updateUser)

    usersRouter.delete('/:id', controller.deleteUser)

    return usersRouter
}


export default makeUsersRouter;