import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { Connection } from 'typeorm';
import { User } from './users/user.entity';
import { ProductsModule } from './products/products.module';
import { CartsModule } from './cart/carts.module';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    CartsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: ' ',
      database: 'shop',
      entities: [User],
      synchronize: true,
      autoLoadEntities: true,
      logging: true
    }),
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
