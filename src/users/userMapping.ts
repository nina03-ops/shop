import { UserDto } from "./dto/user.dto.ts";
import { User } from "./user.entity";

export class Mapper {
   public static userEntityToDto = (user:User):UserDto => {
        const dto = new UserDto();
        dto.id = user.id;
        dto.userName = user.userName;
        dto.firstName = user.firstName;
        dto.lastName = user.lastName;
        dto.password = user.password;
        dto.email = user.email;
    return dto;      
    }
}