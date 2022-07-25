import OrderModel from '../models/order.model'
import { NextFunction, Request, Response } from 'express'

const orderModel = new OrderModel()

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await orderModel.create(req.body)
    res.json({
      status: 'success',
      data: { ...order },
      message: `order ${order.id} created successfully`
    })
  } catch (error) {
    next(error)
  }
}

export const getMany = async (_req: Request, res: Response) => {
  try {
    const orders = await orderModel.getAll()
    res.json({
      status: 'success',
      data: orders,
      message: 'Orders retrieved successfully'
    })
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

export const getOne = async (req: Request, res: Response) => {
  try {
    const order = await orderModel.getOne(req.params.id as unknown as number)
    res.json({
      status: 'success',
      data: order,
      message: 'Order retrieved successfully'
    })
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

export const deleteOne = async (req: Request, res: Response) => {
  try {
    const order = await orderModel.deleteOne(req.params.id as unknown as number)
    res.json({
      status: 'success',
      data: order,
      message: 'Order deleted successfully'
    })
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
export const addP2Order = async (req: Request, res: Response) => {
  try {
    const order = await orderModel.addP2Order(req.body)
    res.json({
      status: 'success',
      data: order,
      message: 'Products Added successfully'
    })
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
