import { ProductDto } from "./dto/product.dto";
import { Product } from "./product.entity";

export class Mapper {
   public static productEntityToDto = (product:Product):ProductDto => {
        const dto = new ProductDto();
        dto.id = product.id;
        dto.name = product.name;
        dto.description = product.description;
        dto.price = product.price;
    return dto;      
    }
}