import Client from '../database'
import {user} from '../types/user.type'
import bcrypt from 'bcrypt'
import config from '../config'

const hashPassword = (password: string) => {
  const salt = parseInt(config.salt as string, 10)
  return bcrypt.hashSync(`${password}${config.pepper}`, salt)
}

class UserModel {
  //create user function
  async create(u: user): Promise<user> {
    try {
      //open connection with database
      const connection = await Client.connect()
      //run the query
      const sqlQuery =
        'INSERT INTO users (id,email,user_name,first_name,last_name,password) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id,email,user_name,first_name,last_name;'
      //return created user
      const result = await connection.query(sqlQuery, [
        u.id,
        u.email,
        u.user_name,
        u.first_name,
        u.last_name,
        hashPassword(u.password)
      ])
      //release the connection
      connection.release()
      return result.rows[0]
    } catch (error) {
      console.log(error)
      throw new Error(`Unable to Create user`)
    }
  }

  //get all users function
  async getall(): Promise<user[]|null> {
    try {
      const connection = await Client.connect()
      const sql = 'SELECT id,email,user_name,first_name,last_name from users ORDER BY id ASC;'
      const result = await connection.query(sql)
      connection.release()
      if(result.rows.length)
      return result.rows
      else return null
    } catch (error) {
      throw new Error(error as string)
    }
  }
  //get user by id function
  async getOne(id: number): Promise<user | null> {
    try {
      const connection = await Client.connect()
      const sql = `SELECT id,email,user_name,first_name,last_name from users where id=($1);`
      const result = await connection.query(sql,[id])
      connection.release()
      if (result.rows.length)
      return result.rows[0]
      else
      return null
    } catch (error) {
      throw new Error(error as string)
    }
  }
  //delete user function
  async deleteOne(id: number): Promise<user|null> {
    try {
      const connection = await Client.connect()
      const checkbyId=`SELECT * FROM users WHERE id=$1;`
      const checkbyIdRes=await connection.query(checkbyId,[id])
      if(checkbyIdRes.rows.length){
      const sql =
        `delete from users where id=($1) RETURNING id,email,user_name,first_name,last_name;`
        const result = await connection.query(sql, [id])
        const restart_seq=`alter sequence users_id_seq restart with 1;`
        await connection.query(restart_seq) // restarts the sequence with 1
        connection.release()
      return result.rows[0]
    }else 
      return null
    } catch (error) {
      throw new Error(error as string)
    }
  }

  //update users function
  async updateOne(u: user): Promise<user> {
    try {
      const connection = await Client.connect()
      const sql = `UPDATE users 
                 SET email=$2,user_name=$3,first_name=$4,last_name=$5,password=$6 
                 where id=$1
                 RETURNING id,email,user_name,first_name,last_name;`
      const result = await connection.query(sql, [
        u.id,
        u.email,
        u.user_name,
        u.first_name,
        u.last_name,
        hashPassword(u.password)
      ])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(error as string)
    }
  }

  //authenticate user function.
  async authenticate(email: string, password: string): Promise<user | null> {
    try {
      const connection = await Client.connect()
      const sql = 'SELECT password FROM users WHERE email=$1;'
      const result = await connection.query(sql, [email])
      if (result.rows.length) {
        const { password: hashPassword } = result.rows[0]
        const isPasswordValid = bcrypt.compareSync(`${password}${config.pepper}`, hashPassword)
        if (isPasswordValid) {
            const sql= 'SELECT id,email,user_name,first_name,last_name from users WHERE email=($1);'
            const userInfo = await connection.query(sql,[email])
          return userInfo.rows[0]
        }
      }
      connection.release()
      return null
    } catch (error) {
      throw new Error(`unable to login:${(error as Error).message}`)
    }
  }
}

export default UserModel
