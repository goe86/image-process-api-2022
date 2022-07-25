import express from 'express'
import proutes from './api/products.route'
import uroutes from './api/users.route'
import oroutes from './api/orders.route'

const routes = express.Router()

routes.use('/users/', uroutes)
routes.use('/products/', proutes)
routes.use('/orders/',oroutes)

export default routes
