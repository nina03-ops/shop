import { IsString } from "class-validator";

export class CreateUserDto {
    @IsString() userName: string;
    @IsString() firstName: string;
    @IsString() lastName: string;
    @IsString() password: string;
    @IsString() email: string;
  }