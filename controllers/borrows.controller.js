function BorrowsController(repository) {


    return {
        async getPendingBorrows(req, res) {
            res.json(await repository.getPending())
        },

        async getBorrowsByUser(req, res) {
            const userId = parseInt(req.params.user_id)
            const borrows = await repository.getBorrowsByUser(userId)

            res.json(borrows)
        },

        async getBorrowsByBook(req, res){
            const bookId = parseInt(req.params.book_id)
            const borrows = await repository.getBorrowsByBook(bookId)

            res.json(borrows)
        },

        async createBorrow(req, res){
            const payload = (req.body)
            const borrow = await repository.createBorrow(payload)

            res.status(201).json(borrow)
        },
    }
}

export default BorrowsController