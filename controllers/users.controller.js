function usersController(repository) {
    return {
        async getAllUsers(req, res) {
            res.json(await repository.getAllUsers())
        },

        async getUser(req, res) {
            const id = parseInt(req.params.id)
            const user = await repository.getUser(id)

            if (!user) {
                res.status(404).send("Sos un pelotudo")
            } else {
                res.json(user)
            }
        },

        async createUser(req, res) {
            const newUser = await repository.createUser(req.body)

            res.status(201).json(newUser)
        },

        async updateUser(req, res) {
            const payload = req.body
            payload.id = parseInt(req.params.id)

            const updatedUser = await repository.updateUser(payload)

            if (updatedUser) {
                res.status(202).json(updatedUser);
            } else {
                res.status(404).send("Not found");
            }
        },

        async deleteUser(req, res) {
            const id = parseInt(req.params.id)
            const deletedUser = await repository.deleteUser(id)

            if (deletedUser) {
                res.status(202).json(deletedUser)
            } else {
                res.status(404).send("Not found")
            }
        },
    }
}

export default usersController
