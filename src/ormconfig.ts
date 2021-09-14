import { ConnectionOptions } from 'typeorm'
import { Product } from './products/product.entity';
import { User } from './users/user.entity';
import { Cart } from './cart/cart.entity';


const config = {
  host: process.env.POSTGRES_DBHOST,
  user: process.env.POSTGRES_DBUSERNAME,     
  password: process.env.POSTGRES_DBPASS,
  database: process.env.POSTGRES_DBNAME,
}

const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  host: config.host,
  port: 5432,
  username: config.user,
  password: config.password,
  database: config.database,
  entities: [User, Product, Cart],
  synchronize: true,
  logging: true,
  ssl: true
}

// const connectionOptions: ConnectionOptions = {
//     type: 'postgres',
//     host: 'localhost',
//     port: 5432,
//     username: 'postgres',
//     password: ' ',
//     database: 'shop',
//     entities: [User, Product, Cart],
//     synchronize: true,
//     logging: true
//   }
export = connectionOptions
