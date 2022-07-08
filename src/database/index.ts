import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { POSTGRES_PORT, POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD } = process.env

const Client = new Pool({
  host: POSTGRES_HOST,
  user: POSTGRES_USER,
  database: POSTGRES_DB,
  port: parseInt(POSTGRES_PORT as string, 10),
  password: POSTGRES_PASSWORD
})
Client.on('error', (error: Error) => {
  console.error(error.message)
})

export default Client
