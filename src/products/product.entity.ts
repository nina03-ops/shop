import { Cart } from "src/cart/cart.entity";
import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany } from "typeorm";

@Entity()
  export class Product{

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;
    
    @Column()
    description: string;

    @Column()
    price: number;

    @ManyToMany(() => Cart)
    @JoinTable()
    carts: Cart[];


}