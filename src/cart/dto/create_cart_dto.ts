import { ApiProperty } from "@nestjs/swagger";

export class CreateCartDto {
  @ApiProperty()
  productIds: number[];

  @ApiProperty()
  userId: number;
  }