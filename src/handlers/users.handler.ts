import UserModel from '../models/user.model'
import  express from 'express'
import jwt from 'jsonwebtoken'
import config from '../config'

const userModel = new UserModel()

export const create = async (req: express.Request, res: express.Response) => {
  try {
    const user = await userModel.create(req.body)
    res.json({
      status: 'success',
      data: { ...user },
      message: `User ${user.user_name} created successfully`
    })
  } catch (error) {
    throw new Error(`Unable to Create user, ${(error as Error).message}`)
  }
}

export const getMany = async (_req: express.Request, res: express.Response) => {
  try {
    const users = await userModel.getall()
    res.json({
      status: 'success',
      data: users,
      message: 'Users retrieved successfully'
    })
  } catch (error) {
    throw new Error(`Unable to retrieve users:${(error as Error).message}`)
  }
}

export const getOne = async (req: express.Request, res: express.Response) => {
  try {
    const user = await userModel.getOne(req.params.id as unknown as number)
    if(!user){
      res.json({
        status:'Not Found',
        data: null,
        message:`Couldn't find user with id : ${req.params.id}`
      })
    }
    else{ 
    res.json({
      status: 'success',
      data: user,
      message: 'User retrieved successfully'
    })}
  } catch (error) {
    throw new Error(`Unable to retrieve user: ${(error as Error).message}`)
  }
}

export const updateUser = async (req: express.Request, res: express.Response) => {
  try {
    const uuser = await userModel.updateOne(req.body)
    res.json({
      status: 'success',
      data: uuser,
      message: 'User Updated successfully'
    })
  } catch (error) {
    throw new Error(`Unable to Update user:${(error as Error).message}`)
  }
}

export const deleteOne = async (req: express.Request, res: express.Response) => {
  try {
    const user = await userModel.deleteOne(req.params.id as unknown as number)
    if (!user){
      res.json({
        status:'Not Found',
        data:null,
        message:`There is no user with id:${req.params.id} to delete`
      })
      } 
   else{
      res.json({
      status: 'success',
      data: user,
      message: 'User deleted successfully'
    })
  }
  } catch (error) {
    throw new Error(`Unable to delete user: ${(error as Error).message}`)
  }
}
export const authenticate = async (req: express.Request, res: express.Response) => {
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
    throw new Error((error as Error).message)
  }
}
