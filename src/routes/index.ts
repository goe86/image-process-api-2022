import { Router } from 'express'
import proutes from './api/products.routes'
import uroutes from './api/users.routes'
import oroutes from './api/orders.routes'

const routes = Router()

routes.use('/users/', uroutes)
routes.use('/products/', proutes)
routes.use('/orders/',oroutes)

export default routes
