const {
  NODE_ENV,
  DB_PORT,
  DB_HOST,
  DB_NAME,
  DB_NAME_TEST,
  DB_USER,
  DB_PASS,
  BCRYPT_PASSWORD,
  SALT_ROUNDS,
  JWT_SECRET
} = process.env

export default {
  port: DB_PORT,
  host: DB_HOST,
  database: NODE_ENV === 'dev' ? DB_NAME : DB_NAME_TEST,
  user: DB_USER,
  password: DB_PASS,
  pepper: BCRYPT_PASSWORD,
  salt: SALT_ROUNDS,
  tokenSecret: JWT_SECRET
}
