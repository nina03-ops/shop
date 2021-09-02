import { Product } from "src/products/product.entity";
import { User } from "src/users/user.entity";
import { Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToOne, JoinColumn } from "typeorm";

@Entity()
  export class Cart{
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToMany(() => Product)
    @JoinTable()
    products: Product[];
    
    @OneToOne(() => User)
    @JoinColumn()
    user: User; 
}