import { Router } from 'express'
import proutes from './api/products.routes'
import uroutes from './api/users.routes'

const routes = Router()

routes.use('/users/', uroutes)
routes.use('/products/', proutes)

export default routes
