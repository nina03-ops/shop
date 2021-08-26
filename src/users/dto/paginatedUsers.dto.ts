import { User } from "../user.entity"

export class PaginatedUsersDto {
  data: User[]
  page: number
  limit: number
  totalCount: number
}