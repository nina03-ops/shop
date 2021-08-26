import { ProductDto } from "./product.dto";

export class PaginatedProductsDto {
  data: ProductDto[]
  page: number
  limit: number
  totalCount: number
}