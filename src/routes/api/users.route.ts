import express from 'express'
import * as controllers from '../../handlers/users.handler'
import validateTokenMiddleware from '../../middleware/authentication.middleware'

const uroutes = express.Router()

uroutes
  .route('/')
  .get(validateTokenMiddleware, controllers.getMany) // checks and validates the token then returns all users.
  .post(controllers.create) // creates a new user.

uroutes
  .route('/:id')
  .get(validateTokenMiddleware,controllers.getOne) //returns a single user with the given id.
  .patch(validateTokenMiddleware, controllers.updateUser) // updates the user with the given id.
  .delete(validateTokenMiddleware, controllers.deleteOne) // deletes the user with the given id.

uroutes.route('/authenticate').post(controllers.authenticate) // authenticates the user.

export default uroutes
