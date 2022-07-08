import express, { Router, Response, Request, NextFunction } from 'express'
import * as controllers from '../../controllers/products.controllers'

const proutes = express.Router()

proutes
  .route('/')
  .get(controllers.getMany) // returns a list of Products.
  .post(controllers.create) // creates a new Product.
proutes
  .route('/:id')
  .get(controllers.getOne) // returns a single Product
  .delete(controllers.deleteOne) // deletes a single Product.

export default proutes
