import { Product } from "./product.entity"

export class PaginatedProducts {
  data: Product[]
  page: number
  limit: number
  totalCount: number
}