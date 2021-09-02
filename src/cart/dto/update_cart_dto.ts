import { Product } from "src/products/product.entity";
import { User } from "src/users/user.entity";

export class UpdateCartDto {
  products: Product[];
  user: User;
  }