import { addWeeks } from 'date-fns'

export default function borrowRepository(db) {


    return {
        async getPending() {
            const { rows } = await db.query("SELECT * FROM borrows WHERE actual_return_date IS NULL")
            return rows
        },

        async getPendingByUser(user_id) {
            const sql = "SELECT * from borrows WHERE user_id = $1 AND actual_return_date IS NULL"

            const { rows } = await db.query(sql, [user_id])

            return rows
        },

        async getBorrowsByUser(user_id) {
            const { rows } = await db.query("SELECT * from borrows WHERE user_id = $1", [user_id])

            return rows
        },

        async getPendingByBook(book_id) {
            const sql = `SELECT borrows.id, borrows.copy_id, copies.book_id, borrows.user_id, borrow_data, estimated_return_date, actual_return_date, fine
            FROM borrows
            JOIN copies ON borrows.copy_id = copies.id
            WHERE copies.book_id = $1 AND actual_return_date IS NULL`

            const { rows } = await db.query(sql, [book_id])

            return rows
        },

        async getBorrowsByBook(copy_id) {
            const sql = `SELECT borrows.id, borrows.copy_id, copies.book_id, borrows.user_id, borrow_date, estimated_return_date, actual_return_date, fine
            FROM borrows
            JOIN copies ON borrows.copy_id = copies.id
            WHERE copies.book_id = $1`

            const { rows } = await db.query(sql, [copy_id])

            return rows
        },

        async createBorrow({ user_id, copy_id }) {
            const existsResult = await db.query('SELECT COUNT(*) AS count FROM borrows WHERE copy_id = $1 AND actual_return_date IS NULL', [copy_id])

            const existsBorrow = parseInt(existsResult.rows[0].count) !== 0

            if (existsBorrow) {
                throw new Error("Copy unavailable.")
            }

            const now = new Date()
            const nextWeek = addWeeks(now, 1)

            const sql = `INSERT INTO borrows (user_id, copy_id, borrow_date, estimated_return_date) VALUES ($1, $2, $3, $4) RETURNING *`

            const { rows } = await db.query(sql, [user_id, copy_id, now, nextWeek])

            return rows[0]
        }
    }}
