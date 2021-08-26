import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create_user_dto';
import { UsersService } from './users.service';
import {User} from './user.entity';
import { UserDto } from './dto/user.dto.ts';
import { Mapper } from './userMapping';
import { PaginationDto } from 'src/utils/pagination.dto';
import { PaginatedUsersDto } from './dto/paginatedUsers.dto';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('create')
  public async create (@Body() createUserDto: CreateUserDto) : Promise <UserDto> {
    const user = new User();
    user.userName = createUserDto.userName;
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.password = createUserDto.password;
    user.email = createUserDto.email;
    const savedUser = await this.usersService.create(user);
    const dto = Mapper.userEntityToDto(savedUser);
    return dto;
  }

    @Get('all')
  public async getAll(@Query() paginationDto: PaginationDto): Promise<PaginatedUsersDto> {
    paginationDto.page = Number(paginationDto.page)
    paginationDto.limit = Number(paginationDto.limit)
    //convert user.Entity in userDto
    const paginatedResult = await this.usersService.getAll(paginationDto);
    const entityList = paginatedResult.data;
    const dtoList : UserDto[] =  [];
    entityList.map(user => dtoList.push(Mapper.userEntityToDto(user)));

    //convert product dto in PaginatedProductsResultDto
    const paginatedUsersDto = new PaginatedUsersDto();
    paginatedUsersDto.data = dtoList;
    paginatedUsersDto.limit = paginationDto.limit;
    paginatedUsersDto.page = paginationDto.page;
    paginatedUsersDto.totalCount = paginatedResult.totalCount;

    return paginatedUsersDto;
  }

  @Get('/:id')
  public async getOne(@Param('id') id: number):Promise<UserDto> {
    const user = await this.usersService.getOne(id);
    const dto = Mapper.userEntityToDto(user);
    return dto;
  } 

  @Put('/edit/:id')
  public async update(@Body() createUserDto: CreateUserDto, @Param('id') id: number): Promise<UserDto> {
    const {userName, firstName, lastName,password, email} = createUserDto;

    const editedUser =  await this.usersService.getOne(id);
    if (!editedUser) {
      throw new NotFoundException('User not found');
    }
    editedUser.userName = userName;
    editedUser.firstName = firstName;
    editedUser.lastName = lastName;
    editedUser.password = password;
    editedUser.email = email;
    const edited = await this.usersService.edit(editedUser);
    const dto = Mapper.userEntityToDto(edited);
    return dto;
}
  
  @Delete('/delete/:id')
  public async remove(@Param('id') id: number) {
    const deletedUser = await this.usersService.delete(id);
    return deletedUser;
  }
}
