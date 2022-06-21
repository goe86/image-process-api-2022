import supertest from 'supertest'
import app from '../index'
import routes from '../routes'
import path from 'path'
import fs from 'fs'
import imgtransform from '../utilities/imgtransform'
import { promises as fsPromises } from 'fs'

// create a request object
const request = supertest(app)

describe('Test endpoint response', () => {
  it('test the api route', () => {
    app.get('/', (res) => {
      expect(res.statusCode).toEqual(200)
    })
  })
  it('test the images endpoint route', () => {
    routes.get('/images', (res) => {
      expect(res.statusCode).toEqual(200)
    })
  })
})

describe('Image processing',async () => {
  const filename = 'fjord'
  const width = 100
  const height = 100
  const outPath =
    path.join(__dirname, '../', '../', 'images/', 'resized/', filename) + `-${width}x${height}.jpg`

  it('resizes an image when proper parameters are passed in the url', async () => {
    await request.get(`/api/images?filename=${filename}&width=${width}&height=${height}`)
    expect(fs.existsSync(outPath)).toBeTrue()
  })
  
  it('Should resize image to given with given width and height',async()=>{
    const expectedFile= await imgtransform('fjord',600,600)
    const outputFile= path.join(__dirname,'../','../','images/','resized/','fjord')+ `-600x600.jpg`
    expect(fs.existsSync(outputFile)).toBeTrue()

})

})
