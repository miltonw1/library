import pg from 'pg'
import { config } from 'dotenv'

const { Client } = pg

export default async function dbConection() {
  config()

  const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  }

  const db = new Client(dbConfig)

  await db.connect()

  return db
}



