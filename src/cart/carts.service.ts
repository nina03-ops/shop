import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './cart.entity';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart)
    private cartsRepository: Repository<Cart>,
  ) {}

  public async create(createCart: Cart): Promise<Cart> {
    return await this.cartsRepository.save(createCart);
  }

  public async getAll(): Promise<Cart[]> {
    const foundCarts = await this.cartsRepository.find({ relations: ["products", "user"] });
    if (!foundCarts) {
      throw new NotFoundException('Carts not found');
    }
    return foundCarts;
  }

  public async getOne(id: number): Promise<Cart> {
    const foundCart = await this.cartsRepository.findOne(id, { relations: ["products", "user"] });
    if (!foundCart) {
      throw new NotFoundException('Cart not found');
    }
    return foundCart;
  }

  public async edit (createCart: Cart): Promise<Cart> {
    return await this.cartsRepository.save(createCart);
  }

  public async delete (id: number): Promise<void> {
    await this.cartsRepository.delete(id);
    // await this.cartsRepository.softDelete(id);
    

  }
}

