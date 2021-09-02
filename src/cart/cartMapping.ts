import { CartDto } from "./dto/cart.dto";
import { Cart } from "./cart.entity";
import { Product } from "src/products/product.entity";

export class Mapper {
   public static cartEntityToDto = (cart:Cart):CartDto => {
        const dto = new CartDto();
        dto.id = cart.id;
        let arr : number [] = [];
        //iterez entity pentru face push in arr o lista de numere.
        for(let i = 0 ; i < cart.products.length; i++){
            arr.push(cart.products[i].id); // cart.products[i] este type product.
        }        
        dto.productIds = arr;
        dto.userId = cart.user.id; 
    return dto;      
    }
}