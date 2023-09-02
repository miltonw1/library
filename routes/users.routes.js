import { Router } from 'express'
import * as usersController from '../controllers/users.controller.js'

const usersRoutes = Router()


usersRoutes.get('/', usersController.getAllUsers)

usersRoutes.get('/:id', usersController.getUser)

usersRoutes.post('/', usersController.createUser)

usersRoutes.put('/:id', usersController.updateUser)

usersRoutes.delete('/:id', usersController.deleteUser)


export default usersRoutes;