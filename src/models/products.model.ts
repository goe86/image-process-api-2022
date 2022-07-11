import Client from '../database'
import product from '../types/product.types'
import config from '../config'

class ProductModel {
  //create user function
  async create(p: product): Promise<product> {
    try {
      //open connection with database
      const connection = await Client.connect()
      //run the query
      const sqlQuery =
        'INSERT INTO products (id,product_name,product_description,product_price) VALUES ($1,$2,$3,$4) RETURNING *;'
      //return created product
      const result = await connection.query(sqlQuery, [
        p.id,
        p.product_name,
        p.product_description,
        p.product_price
      ])
      //release the connection
      connection.release()
      return result.rows[0]
    } catch (error) {
      console.log(error)
      throw new Error(`Unable to Create product: ${error}`)
    }
  }

  //get all products function
  async getAll(): Promise<product[]> {
    try {
      const connection = await Client.connect()
      const sql = 'SELECT * from products;'
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    } catch (error) {
      throw new Error(error as string)
    }
  }
  //get product by id function
  async getOne(id: number): Promise<product> {
    try {
      const connection = await Client.connect()
      const sql = `SELECT * from products where id=($1);`
      const result = await connection.query(sql,[id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(error as string)
    }
  }
  //delete product function
  async deleteOne(id: number): Promise<product> {
    try {
      const connection = await Client.connect()
      const sql = "delete from products where id=($1) RETURNING *;"
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(error as string)
    }
  }

//update a product function
async updateOne(p: product): Promise<product> {
  try {
    const connection = await Client.connect()
    const sql = `UPDATE products 
               SET product_name=$2,product_description=$3,product_price=$4
               where id=$1
               RETURNING *;`
    const result = await connection.query(sql, [
      p.id,
      p.product_name,
      p.product_description,
      p.product_price
    ])
    connection.release()
    return result.rows[0]
  } catch (error) {
    throw new Error(error as string)
  }
}
}
export default ProductModel
