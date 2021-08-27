import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { PaginationDto } from '../utils/pagination.dto';
import { PaginatedProducts } from './paginatedProducts';
import { Product } from './product.entity';


@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  public async create(
    createProduct: Product,
  ): Promise<Product> {
    return await this.productsRepository.save(createProduct);
  }


  public async getAll(search: string, paginationDto: PaginationDto): Promise<PaginatedProducts> {
    const skippedItems = (paginationDto.page - 1) * paginationDto.limit;
    let query = this.productsRepository.createQueryBuilder()
    if (search){
      query = query.where("name ILike :name", { name:'%' + search + '%' })
      .orWhere("description ILike :description", { description:'%' + search + '%' })
      .orWhere("price = :price", { price: search })      
    }
    const totalCount = await query.getCount();      
    const products = await query.offset(!skippedItems ? null : skippedItems)
      .limit(!paginationDto.limit ? null : paginationDto.limit)
      .getMany()
      
    return {
      totalCount,
      page: paginationDto.page,
      limit: paginationDto.limit,
      data: products    
    }
  }

  public async getOne(id: number): Promise<Product> {
    const found = await this.productsRepository.findOne(id);
    if (!found) {
      throw new NotFoundException('User not found');
    }
    return found;
  }

  public async edit (createUser: Product): Promise<Product> {
    return await this.productsRepository.save(createUser);
  }

  public async delete (id: number): Promise<void> {
    await this.productsRepository.delete(id);
  }
}

