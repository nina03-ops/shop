require('dotenv').config()

import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CartsModule } from './cart/carts.module';
import * as connectionOptions from './ormconfig';
import { AuthenticationMiddleware } from './commons/authentication.middleware';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    CartsModule,
    TypeOrmModule.forRoot({...connectionOptions, autoLoadEntities: true}),
  ],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes(
        { path: '/user', method: RequestMethod.POST },
        { path: '/product', method: RequestMethod.POST },
        { path: '/cart', method: RequestMethod.POST },
      );
    }
}
