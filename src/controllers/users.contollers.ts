import user from '../types/user.types'
import UserModel from '../models/user.model'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config'

const userModel = new UserModel()

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.create(req.body)
    res.json({
      status: 'success',
      data: { ...user },
      message: `User ${user.user_name} created successfully`
    })
  } catch (error) {
    next(error)
  }
}

export const getMany = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userModel.getall()
    res.json({
      status: 'success',
      data: users,
      message: 'Users retrieved successfully'
    })
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.getOne(req.params.id)
    res.json({
      status: 'success',
      data: user,
      message: 'User retrieved successfully'
    })
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.updateOne(req.body)
    res.json({
      status: 'success',
      data: user,
      message: 'User Updated successfully'
    })
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

export const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.deleteOne(req.params.id)
    res.json({
      status: 'success',
      data: user,
      message: 'User deleted successfully'
    })
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body
    const user = await userModel.authenticate(email, password)
    const token = jwt.sign({ user }, config.tokenSecret as unknown as string)
    if (!user) {
      return res.status(401).json({
        status: 'unauthorized',
        message: 'The username and password do not match. please try again'
      })
    }
    return res.json({
      status: 'success',
      data: { ...user, token },
      message: 'user authenticated successfully'
    })
  } catch (error) {
    throw new Error(error as string)
  }
}
