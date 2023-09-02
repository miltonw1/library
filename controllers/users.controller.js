import * as usersRepository from '../repositories/users.repository.js'

export async function getAllUsers(req, res) {
    res.json(await usersRepository.getAllUsers())
}

export async function getUser(req, res){
    const id = parseInt(req.params.id)
    const user = await usersRepository.getUser(id)

    if (!user) {
        res.status(404).send("Sos un pelotudo")
    } else {
        res.json(user)
    }
}

export async function createUser(req, res) {
    const newUser = await usersRepository.createUser(req.body)
    
    res.status(201).json(newUser)
}

export async function updateUser(req, res) { 
    const payload = req.body
    payload.id = parseInt(req.params.id)

    const updatedUser = await usersRepository.updateUser(payload)

    if (updatedUser) {
        res.status(202).json(updatedUser);
    } else {
        res.status(404).send("Not found");
    }
}

export async function deleteUser(req, res){
    const id = parseInt(req.params.id)
    const deletedUser = await usersRepository.deleteUser(id)

    if (deletedUser) {
        res.status(204).json(deletedUser)
    } else {
        res.status(404).send("Not found")
    } 
}