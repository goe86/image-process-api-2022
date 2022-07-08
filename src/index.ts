import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
import routes from './routes'

dotenv.config()

const PORT = process.env.PORT || 3000
// create an instance server
const app: Application = express()

// HTTP request logger middleware
app.use(morgan('dev'))
app.use(express.json())

app.use('/api', routes)

// add routing for / path
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello World'
  })
})

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at port:${PORT}`)
})

export default app
