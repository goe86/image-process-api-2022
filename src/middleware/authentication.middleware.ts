import express, { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config'

const handleUnauthorizedError = (next: NextFunction) => {
  const err: Error = new Error('Login Error: Please Try Again')
  next(err)
}

const validateTokenMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const authHeader = req.get('Authorization')
    if (authHeader) {
      const bearer = authHeader.split(' ')[0].toLowerCase()
      const token = authHeader.split(' ')[1]
      if (token && bearer === 'bearer') {
        const decode = jwt.verify(token, config.tokenSecret as string)
        if (decode) {
          next()
        }
      } else {
        handleUnauthorizedError(next)
      }
    } else {
      handleUnauthorizedError(next)
    }
  } catch (err) {
    handleUnauthorizedError(next)
  }
}
export default validateTokenMiddleware
