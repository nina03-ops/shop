import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateProductDto } from './dto/create_product_dto';
import { PaginationDto } from '../utils/pagination.dto';
import { ProductDto } from './dto/product.dto';
import { Product } from './product.entity';
import { Mapper } from './productMapping';
import { ProductsService } from './products.service';
import { PaginatedProductsDto } from './dto/paginatedProductsDto';
import { AdminGuard } from 'src/commons/admin.guard';


@Controller('product')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post('create')
  @UseGuards(new AdminGuard())
  @UsePipes(new ValidationPipe())
  public async create (@Body() createProductDto: CreateProductDto) : Promise <ProductDto> {
    const product = new Product();
    product.name = createProductDto.name;
    product.description = createProductDto.description;
    product.price = createProductDto.price;
    const savedProduct = await  this.productsService.create(product);
    const dto = Mapper.productEntityToDto(savedProduct);
    return dto;
  }

  @Get('all')
  public async getAll(
    @Query() paginationDto: PaginationDto,
    @Query('search') search: string,
    ): Promise<PaginatedProductsDto> {
    paginationDto.page = Number(paginationDto.page)
    paginationDto.limit = Number(paginationDto.limit)
    
    const paginatedResult = await this.productsService.getAll(search,paginationDto);
    const entityList = paginatedResult.data;
        //convert product entity in product dto
    const dtoList : ProductDto[] =  [];
    entityList.map(product => dtoList.push(Mapper.productEntityToDto(product)));
    //convert product dto in PaginatedProductsResultDto
    const paginatedProdDto = new PaginatedProductsDto();
    paginatedProdDto.data = dtoList;
    paginatedProdDto.limit = paginationDto.limit;
    paginatedProdDto.page = paginationDto.page;
    paginatedProdDto.totalCount = paginatedResult.totalCount;

    return paginatedProdDto;
  }

  @Get('/:id')
  public async getOne(@Param('id') id: number):Promise<ProductDto> {
    const product = await this.productsService.getOne(id);
    const dto = Mapper.productEntityToDto(product);
    return dto;
  } 


  @Put('/edit/:id')
  public async update(@Body() createProductDto: CreateProductDto, @Param('id') id: number): Promise<ProductDto> {
    const {name, description, price} = createProductDto;

    const editedProduct =  await this.productsService.getOne(id);
    if (!editedProduct) {
      throw new NotFoundException('Product not found');
    }
    editedProduct.name = name;
    editedProduct.description = description;
    editedProduct.price = price;
    const edited = await this.productsService.edit(editedProduct);
    const dto = Mapper.productEntityToDto(edited)
    return dto;
}
  
  @Delete('/delete/:id')
  public async remove(@Param('id') id: number) {
    const deletedProduct = await this.productsService.delete(id);
    return deletedProduct;
  }
}
