import * as borrowsRepository from '../repositories/borrows.repository.js'


export async function getAllBorrows(req, res) {
    res.json(await borrowsRepository.getAllBorrows())
}
export async function getBorrowByUser(req, res){
    const id = parseInt(req.params.id)
    const user = await usersRepository.getUser(id)

    if (!user) {
        res.status(404).send("Sos un pelotudo")
    } else {
        res.json(user)
    }
}