export default function copiesRepository (db) {

    /**
     * @param {number} book_id
     * 
     * @returns {Promise<number>}
     */
    const getNextInternalId = async (book_id) => {
        const sql = "SELECT COUNT(*) + 1 AS next_internal_id FROM copies WHERE book_id = $1"

        const { rows } = await db.query(sql, [book_id])

        return parseInt(rows[0].next_internal_id)
    }

    return {
        async getAllCopies(book_id) {
            const { rows } = await db.query("SELECT * FROM copies WHERE book_id = $1 AND deleted_at IS NULL", [book_id])

            return rows
        },
        
        async getCopy(id) {
            const { rows } = await db.query("SELECT * FROM copies WHERE id = $1 AND deleted_at IS NULL", [id])

            return rows[0]
        },
        
        async updateCopy({ id, book_id, internal_id }) {
            const sql = "UPDATE copies SET book_id = $1, internal_id = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 AND deleted_at IS NULL RETURNING *"

            const { rows } = await db.query(sql, [book_id, internal_id, id])

            return rows[0]
        },
        
        async createCopy({ book_id }) {
            const internalId = await getNextInternalId(book_id)
            
            const sql = "INSERT INTO copies (book_id, internal_id) VALUES ($1, $2) RETURNING *"

            const { rows } = await db.query(sql, [book_id, internalId])

            return rows
        },
        
        async deleteCopy(id) {
            const sql = "UPDATE copies SET deleted_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *"

            const { rows } = await db.query(sql, [id])

            return rows
        },
    }
}