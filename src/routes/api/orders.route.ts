import  express from 'express'
import * as controllers from '../../handlers/orders.handler'
import validateTokenMiddleware from '../../middleware/authentication.middleware'

const oroutes= express.Router()


oroutes
  .route('/')
  .get(validateTokenMiddleware,controllers.getMany) // returns a list of Products.
  .post(controllers.create) // adds a new order.

oroutes
  .route('/:id')
  .get(validateTokenMiddleware,controllers.getOne) // returns a single Product
  .delete(validateTokenMiddleware,controllers.deleteOne) // deletes a single Product

oroutes.route('/products/')
  .post(controllers.addP2Order)


export default oroutes