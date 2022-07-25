import express from 'express'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
import routes from './routes'

dotenv.config()
//define the port of the server 
const PORT = process.env.PORT || 3000
// create an instance of the server
const server = express()

// HTTP request logger middleware
server.use(morgan('dev'))

server.use(express.json())

server.use('/api', routes)

// add routing for / path
server.get('/', (req:express.Request, res: express.Response) => {
  res.json({
    message: `Hello 👋 kindly visit 'http://localhost:3000/api' to use the app `
  })
})

// start express server
server.listen(PORT, () => {
  console.log(`Server is running at port:${PORT}`)
})

export default server
