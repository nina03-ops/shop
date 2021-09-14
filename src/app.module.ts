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
  ],
})
export class AppModule {}
