export default function usersRepository(db) {

    return {

        async getAllUsers() {
            const { rows } = await db.query("SELECT * from users")
            return rows
        },

        async getUser(id) {
            const { rows } = await db.query("SELECT * from users WHERE id = $1", [id])
            return rows[0]
        },

        async createUser({ name, last_name }) {
            const sql = "INSERT INTO users (name, last_name) VALUES ($1, $2) RETURNING *"

            const { rows } = await db.query(sql, [name, last_name])

            return rows[0]
        },

        async updateUser({ id ,name, last_name }) {
            const sql = "UPDATE users SET name = $1, last_name = $2 WHERE id = $3 RETURNING *"

            const { rows } = await db.query(sql, [name, last_name, id])

            return rows[0]
        },

        async deleteUser(id) {
            const { rows } = await db.query("DELETE FROM users WHERE id = $1 RETURNING *", [id])

            return rows[0]
        },
    }
}

