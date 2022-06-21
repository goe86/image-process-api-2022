import { promises as fsPromises } from 'fs'
import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import express from "express"


const imgtransform = async (filename: string, width: number, height: number): Promise<string> => {
  const imagefolder: string = path.join(__dirname, '../', '../', 'images/', filename) + '.jpg'
  const resizedimgfold: string = path.join(__dirname, '../', '../', 'images/', 'resized/')
  const resizedimg: string =
    path.join(__dirname, '../', '../', 'images/', 'resized/', filename) + `-${width}x${height}.jpg`
  
   

  if (!fsPromises.readdir(resizedimgfold)) {
    await fsPromises.mkdir(resizedimgfold)
  }
  try {
    await sharp(imagefolder).resize(width, height).toFile(resizedimg)
    return resizedimg
  } catch (error) {
    return error as string
  }
}
export default imgtransform
