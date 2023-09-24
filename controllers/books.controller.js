function booksController (repository) {
    
    return {
        async getAllBooks(req, res) {
            res.json(await repository.getAllBooks())
        },

        async getBook(req, res) {
            const id = parseInt(req.params.id)
            const book = await repository.getBook(id)
            
            if (!book) {
                res.status(404).send("No se encontro libro")
            } else {
                res.json(book)
            }
        },

        async createBook(req, res) {
            const newBook = await repository.createBook(req.body)
            res.status(201).json(newBook)
        },

        async updateBook(req, res) {
            const payload = req.body
            payload.id = parseInt(req.params.id)
        
            const updatedBook = await repository.updateBook(payload)
        
            if (updatedBook) {
                res.status(202).json(updatedBook);
            } else {
                res.status(404).send("Not found");
            }
        },

        async deleteBook(req, res){
            const id = parseInt(req.params.id)
            const deletedBook = await repository.deleteBook(id)
        
            if (deletedBook) {
                res.status(204).json(deletedBook)
            } else {
                res.status(404).send("Not found")
            } 
        }
    }
}

export default booksController