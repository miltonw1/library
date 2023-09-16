import { Router } from 'express'
import booksRoutes from './books.routes.js'
import usersRoutes from './users.routes.js'
import borrowsRoutes from './borrows.routes.js'

function makeMainRoutes (db) {
    const router = Router()
    
    router.get('/', (req, res) => {
        res.send("Hello world")
    })
    
    router.use('/books', booksRoutes(db))
    router.use('/users', usersRoutes(db))
    router.use('/borrows', borrowsRoutes)

    return router
}


export default makeMainRoutes;
