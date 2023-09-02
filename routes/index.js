import { Router } from 'express'
import booksRoutes from './books.routes.js'
import usersRoutes from './users.routes.js'


const router = Router()


router.get('/', (req, res) => {
    res.send("Hello world")
})

router.use('/books', booksRoutes)
router.use('/users', usersRoutes)

export default router;
