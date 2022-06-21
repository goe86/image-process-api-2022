import express from 'express'
import { promises as fsPromises } from 'fs'
import path from 'path'
import fs from 'fs'
import imgtransform from '../utilities/imgtransform'
import { IQuery } from '../interfaces/interfaces'

const routes = express.Router()

// (/api route)
routes.get('/', (req:express.Request, res:express.Response) => {
  res.send('Welcome to the api')
})
// (/api/images route )
routes.get('/images', async (req: express.Request, res: express.Response):Promise<void> => {
  if (req.query as unknown as IQuery) {
    const filename = req.query.filename as string
    const width = Number(req.query.width);
    const height = Number(req.query.height);
 
  
    const resizedimg: string =
      path.join(__dirname, '../', '../', 'images/', 'resized/', filename) +
      `-${width}x${height}.jpg`
//check if file exists in output folder(resized)
    if (fs.existsSync(resizedimg)) {
      res.sendFile(resizedimg)
    } else {
      const imgProcessed = await imgtransform(filename as string, width, height)

      if (!String(imgProcessed).includes('Error')) {
        res.sendFile(imgProcessed)
      } else {
        res.send("There has been an Error Processing your image. Kindly check {Filename , Width and Height parameters.")
      }
    }
  } else {
    res
      .status(500)
      .send(
        'invalid url (filename, width and height are mandatory also width and height must be numbers).'
      )
  }
})
export default routes
