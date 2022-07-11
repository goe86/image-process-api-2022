import ProductModel from '../models/products.model'
import { NextFunction, Request, Response } from 'express'

const productModel = new ProductModel()

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productModel.create(req.body)
    res.json({
      status: 'success',
      data: { ...product },
      message: `Product ${product.product_name} created successfully`
    })
  } catch (error) {
    next(error)
  }
}

export const getMany = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await productModel.getAll()
    res.json({
      status: 'success',
      data: products,
      message: 'Products retrieved successfully'
    })
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productModel.getOne(req.params.id as unknown as number)
    res.json({
      status: 'success',
      data: product,
      message: 'Product retrieved successfully'
    })
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

export const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productModel.deleteOne(req.params.id as unknown as number)
    res.json({
      status: 'success',
      data: product,
      message: 'Product deleted successfully'
    })
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const uproduct = await productModel.updateOne(req.body)
    res.json({
      status: 'success',
      data: uproduct,
      message: 'User Updated successfully'
    })
  } catch (error) {
    throw new Error((error as Error).message)
  }
}