import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, } from '@nestjs/common';
import { Mapper } from './cartMapping';

import { CreateCartDto } from './dto/create_cart_dto';
import { CartDto } from './dto/cart.dto';
import { Cart } from './cart.entity';
import { CartsService } from './carts.service';
import { User } from 'src/users/user.entity';
import { Product } from 'src/products/product.entity';

@Controller('cart')
export class CartsController {
  constructor(private cartsService: CartsService) {}

  @Post('create')
  public async create (@Body() createCartDto: CreateCartDto) : Promise <CartDto> {
    const cart = new Cart();
    const dtoList = createCartDto.productIds;
    let arr : Product []= [];
    //iterez prin lista de dto pentru face push in arr o lista de obiecte ce contin doar idu
    for(let i = 0 ; i < dtoList.length; i++){
      let product = new Product();
      product.id = dtoList[i];
      arr.push(product);
    }
    cart.products = arr;
    const user = new User();
    user.id = createCartDto.userId;
    cart.user = user;
    const savedCart = await this.cartsService.create(cart);
    const dto = Mapper.cartEntityToDto(savedCart);
    return dto;
  }

  @Get('all')
  public async getAll():Promise<CartDto[]> {
    const cart = await this.cartsService.getAll();
    console.log("1", cart); // Cart[]
    let arr : CartDto [] = [];
    for (let i = 0; i < cart.length; i++){
      const dto = Mapper.cartEntityToDto(cart[i]);
      arr.push(dto);
    }
    return arr;
  } 

  @Get('/:id')
  public async getOne(@Param('id') id: number):Promise<CartDto> {
    const cart = await this.cartsService.getOne(id);
    const dto = Mapper.cartEntityToDto(cart);
    return dto;
  } 

  @Put('/edit/:id')
  public async update(@Body() createCartDto: CreateCartDto, @Param('id') id: number): Promise<CartDto> {
    const editedCart =  await this.cartsService.getOne(id);
    console.log(editedCart)
    if (!editedCart) {
      throw new NotFoundException('Cart not found');
    }
    let dtoList = createCartDto.productIds;
    let arr : Product [] = [];
    for(let i = 0 ; i < dtoList.length; i++){
      console.log(dtoList[i]);
      let pr = new Product();
      pr.id = dtoList[i];
      arr.push(pr);
    }
    editedCart.products = arr;
    editedCart.user.id  = createCartDto.userId;
    const edited = await this.cartsService.edit(editedCart);
    const dto = Mapper.cartEntityToDto(edited);
    return dto;
}
  
  @Delete('/delete/:id')
  public async remove(@Param('id') id: number) {
    const deletedCart = await this.cartsService.delete(id);
    return deletedCart;
  }
}
