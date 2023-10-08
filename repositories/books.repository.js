export default function booksRepository (db) {

    return {
        async getAllBooks() {
            const { rows } = await db.query("SELECT * FROM books")

            return rows
        },
        
        async getBook(id) {
            const { rows } = await db.query("SELECT * FROM books WHERE id = $1", [id])

            return rows[0]
        },
        
        async updateBook({ id, title, author, release }) {
            const sql = "UPDATE books SET title = $1, author = $2, release = $3 WHERE id = $4 RETURNING *"

            const { rows } = await db.query(sql, [title, author, release, id])

            return rows[0]
        },
        
        async createBook({ title, author, release }) {
            const sql = "INSERT INTO books (title, author, release) VALUES ($1, $2, $3) RETURNING *"
            const { rows } = await db.query(sql, [title, author, release])

            return rows[0]
        },
        
        async deleteBook(id) {
            const { rows } = await db.query("DELETE FROM books WHERE id = $1 RETURNING *", [id])
            console.log(rows)
            return rows[0]
        },
    }
}