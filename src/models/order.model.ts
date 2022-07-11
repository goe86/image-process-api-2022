import Client from '../database'
import { order,order_products } from '../types/order.types'


class OrderModel {
  //create order function
  async create(o: order_products): Promise<order> {
    try {
      //open connection with database
      const connection = await Client.connect()
      //run the query
      const sqlQuery =
        'INSERT INTO order_products (order_id,product_id,quantity) VALUES ($1,$2,$3) RETURNING *;'
      //return created order
      const result = await connection.query(sqlQuery, [
        o.order_id,
        o.product_id,
        o.quantity,
      ])
      //release the connection
      connection.release()
      return result.rows[0]
    } catch (error) {
        throw new Error(`Unable to Create order: ${error}`)
    }
  }

  //get all orders function
  async getAll(): Promise<order[]> {
    try {
      const connection = await Client.connect()
      const sql = 'SELECT * from products INNER JOIN order_products ON products.id = order_products.id;'
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    } catch (error) {
      throw new Error(error as string)
    }
  }
  //get order by id function
  async getOne(id: number): Promise<order> {
    try {
      const connection = await Client.connect()
      const sql = `SELECT * from products INNER JOIN order_products ON products.id = order_products.id;`
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(error as string)
    }
  }
  //delete order function
  async deleteOne(id: number): Promise<order> {
    try {
      const connection = await Client.connect()
      const sql = `DELETE from orders where id=($1) RETURNING *;`
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(error as string)
    }
  }
async addOrder(o:order): Promise<order>  {
  try {
      const connection = await Client.connect()
      const sql = `INSERT INTO orders (id,status,user_id) values ($1,$2,$3) RETURNING *;`
      const result = await connection.query(sql, [o.id,o.status,o.user_id])
      connection.release()
      return result.rows[0]
  } catch (error) {
    throw new Error(`Cannot add products to Order, ${(error as Error).message}`)
  }
  }
}


export default OrderModel
