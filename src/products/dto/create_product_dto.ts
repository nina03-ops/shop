import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";
export class CreateProductDto {
  @IsString()
  @ApiProperty()
  name: string;
  
  @IsString() 
  @ApiProperty()
  description: string;
  
  @IsInt() 
  @ApiProperty()
  price: number;
  }