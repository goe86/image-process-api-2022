import express from 'express'
import * as controllers from '../../handlers/products.handler'
import validateTokenMiddleware from '../../middleware/authentication.middleware'

const proutes = express.Router()

proutes
  .route('/')
  .get(validateTokenMiddleware,controllers.getMany) // returns a list of Products.
  .post(controllers.create) // creates a new Product.
proutes
  .route('/:id')
  .get(validateTokenMiddleware,controllers.getOne) // returns a single Product
  .delete(validateTokenMiddleware,controllers.deleteOne) // deletes a single Product.
  .patch(validateTokenMiddleware,controllers.updateProduct) // updates a single Product

export default proutes
