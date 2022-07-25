import ProductModel from '../models/products.model'
import express from 'express'
import { stringify } from 'querystring'

const productModel = new ProductModel()

export const create = async (req: express.Request, res: express.Response) => {
  try {
    const product = await productModel.create(req.body)
    res.json({
      status: 'success',
      data: { ...product },
      message: `Product ${product.product_name} created successfully`
    })
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

export const getMany = async (_req: express.Request, res: express.Response) => {
  try {
    const products = await productModel.getAll()
    if(!products){
      res.json({
        status:"Not Found",
        data:null,
        message:`No products were added to database.`
      })
    }
    res.json({
      status: 'success',
      data: products,
      message: 'Products retrieved successfully'
    })
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

export const getOne = async (req: express.Request, res: express.Response) => {
  try {
    const product = await productModel.getOne(req.params.id as unknown as number)
    if(!product){
      res.json({
        status:'Not Found',
        data: null,
        message:`Couldn't find Product with id : ${req.params.id}`
      })
    } 
    else{
    res.json({
      status: 'success',
      data: product,
      message: 'Product retrieved successfully'
    })
 }
  } catch (error) {
    throw new Error ((error as Error) .message)
  }
}


export const deleteOne = async (req: express.Request, res: express.Response) => {
  try {
    const product = await productModel.deleteOne(req.params.id as unknown as number)
    if(!product){
      res.json({
        status:'Not Found',
        data:null,
        message:`There is no Product with id:${req.params.id} to delete`
      })
    }
    else{
    res.json({
      status: 'success',
      data: product,
      message: 'Product deleted successfully'
    })
  }
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
export const updateProduct = async (req: express.Request, res: express.Response) => {
  try {
    const uproduct = await productModel.updateOne(req.body)
    res.json({
      status: 'success',
      data: uproduct,
      message: 'Product Updated successfully'
    })
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
