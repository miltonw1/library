function copiesController (repository) {
    
    return {
        async getAllCopies(req, res) {
            const book_id = parseInt(req.params.book_id)

            res.json(await repository.getAllCopies(book_id))
        },

        async getCopy(req, res) {
            const id = parseInt(req.params.id)
            const copy = await repository.getCopy(id)
            
            if (!copy) {
                res.status(404).send("No se encontro copia")
            } else {
                res.json(copy)
            }
        },

        async createCopy(req, res) {
            const book_id = parseInt(req.params.book_id)

            const newCopy = await repository.createCopy({ book_id })
            res.status(201).json(newCopy)
        },

        async updateCopy(req, res) {
            const payload = req.body
            payload.id = parseInt(req.params.id)
        
            const updatedCopy = await repository.updateCopy(payload)
        
            if (updatedCopy) {
                res.status(202).json(updatedCopy);
            } else {
                res.status(404).send("Not found");
            }
        },

        async deleteCopy(req, res){
            const id = parseInt(req.params.id)
            const deletedCopy = await repository.deleteCopy(id)
        
            if (deletedCopy) {
                res.status(202).json(deletedCopy)
            } else {
                res.status(404).send("Not found")
            } 
        }
    }
}

export default copiesController