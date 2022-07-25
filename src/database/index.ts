import { Pool } from 'pg'
import dotenv from 'dotenv'
import {response} from 'express'

dotenv.config()

//create new database instance 
const db = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.NODE_ENV ==='dev' ? process.env.DB_NAME: process.env.DB_NAME_TEST,
  port: parseInt(process.env.DB_PORT as string, 10),
  password: process.env.DB_PASS
})
// Connecting to database Error Handling
db.on('error', (error: Error) => {
  console.error(error.message)
  response.json({
    status:"Error",
    data:error.message
    })
})

export default db
