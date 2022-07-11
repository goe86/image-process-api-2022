import express, { Router, Response, Request, NextFunction } from 'express'
import * as controllers from '../../controllers/orders.controllers'
import validateTokenMiddleware from '../../middleware/authentication.middleware'

const oroutes= Router()


oroutes
  .route('/')
  .get(validateTokenMiddleware,controllers.getMany) // returns a list of Products.
  .post(controllers.addOrder) // adds a new order.

oroutes
  .route('/:id')
  .get(validateTokenMiddleware,controllers.getOne) // returns a single Product
  .delete(validateTokenMiddleware,controllers.deleteOne) // deletes a single Product

oroutes.route('/products/')
  .post(controllers.create)


export default oroutes