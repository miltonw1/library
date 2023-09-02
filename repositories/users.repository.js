import fs from 'fs/promises';
import path from 'path';

const file = path.join('repositories', 'users.json')

export async function getAllUsers() {
    const users = await fs.readFile(file)
    return JSON.parse(users)
}

export async function getUser(id) {
    const users = await getAllUsers()
    return users.find((user) => user.id === id)
}

export async function createUser(payload) {

    let users = await getAllUsers();
    const id = users.length + 1;

    const newUser = { ...payload, id }

    users.push(newUser)

    await fs.writeFile(file, JSON.stringify(users, null, 4))
}

export async function updateUser(payload) {
    let users = await getAllUsers()

    const index = users.findIndex((user) => user.id === payload.id)

    if (index === -1) {
        return undefined
    }

    users[index] = payload

    await fs.writeFile(file, JSON.stringify(users, null, 4))
    return payload;
}

export async function deleteUser(id) {
    let user = await getAllUsers();

    const index = user.findIndex((user) => user.id === id)

    if (index === -1) {
        return undefined
    }

    const deletedUser = user.splice(index, 1)

    await fs.writeFile(file, JSON.stringify(user, null, 4))
    return deletedUser[0]
}