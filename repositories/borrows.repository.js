import fs from 'fs/promises';
import path from 'path';


const file = path.join('repositories', 'borrows.json')
const usersFile = path.join('repositories', 'users.json')


export async function getAllBorrows() {
    const borrows = await fs.readFile(file)
    return JSON.parse(borrows)
}

export async function getBorrowByUser(id) {
    const borrows = await fs.readFile(file)
    const users = await fs.readFile(usersFile)

    
}