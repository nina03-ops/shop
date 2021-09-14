require('dotenv').config()

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
// import { Connection } from 'typeorm';
import { User } from './users/user.entity';
import { ProductsModule } from './products/products.module';
import { CartsModule } from './cart/carts.module';
import * as connectionOptions from './ormconfig';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    CartsModule,
    TypeOrmModule.forRoot({...connectionOptions, autoLoadEntities: true}),

    // TypeOrmModule.forRoot({
      // Local db
      // type: 'postgres',
      // host: 'localhost',
      // port: 5432,
      // username: 'postgres',
      // password: ' ',
      // database: 'shop',
      // entities: [User],
      // synchronize: true,
      // autoLoadEntities: true,
      // logging: true

      //Azure db
      // host: process.env.DB_HOST,
      // username: process.env.DB_USERNAME,     
      // password: process.env.DB_PASS,
      // database: process.env.DB_NAME,
      // port: 5432,
      // ssl: true
    // }),
  ],
})
export class AppModule {}
// export class AppModule {
//   constructor(private connection: Connection) {}
// }
