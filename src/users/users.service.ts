import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/utils/pagination.dto';
import { Repository } from 'typeorm';
import { PaginatedUsers } from './paginatedUsers';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  public async create(createUser: User): Promise<User> {
    return await this.usersRepository.save(createUser);
  }

  public async getAll(paginationDto: PaginationDto): Promise<PaginatedUsers> {
    const skippedItems = (paginationDto.page - 1) * paginationDto.limit;

    const totalCount = await this.usersRepository.count()
    const users = await this.usersRepository.createQueryBuilder()
      .offset(!skippedItems ? null : skippedItems)
      .limit(!paginationDto.limit ? null : paginationDto.limit)
      .getMany()

    return {
      totalCount,
      page: paginationDto.page,
      limit: paginationDto.limit,
      data: users,
    }
  }

  public async getOne(id: number): Promise<User> {
    const foundUser = await this.usersRepository.findOne(id);
    if (!foundUser) {
      throw new NotFoundException('User not found');
    }
    return foundUser;
  }

  public async edit (createUser: User): Promise<User> {
    return await this.usersRepository.save(createUser);
  }

  public async delete (id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}

