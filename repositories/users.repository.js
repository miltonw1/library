export default function usersRepository(db) {

    return {

        async getAllUsers() {
            const { rows } = await db.query("SELECT * from users")
            return rows
        },

        async getUser(id) {
            const { rows } = await db.query("SELECT * from users WHERE id = $1", [id])
            return rows
        },

        async createUser({ name, last_name }) {
            const sql = "INSERT INTO users (name, last_name) VALUES ($1, $2)"

            const { rows } = await db.query(sql, [name, last_name])

            return rows
        },

        async updateUser({ id ,name, last_name }) {
            const sql = "UPDATE users SET name = $1, last_name = $2 WHERE id = $3"

            const { rows } = await db.query(sql, [name, last_name, id])

            return rows
        },

        async deleteUser(id) {
            const { rows } = await db.query("DELETE FROM users WHERE id = $1", [id])

            return rows
        },
    }
}

