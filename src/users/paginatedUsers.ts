import { User } from "./user.entity"

export class PaginatedUsers {
  data: User[]
  page: number
  limit: number
  totalCount: number
}