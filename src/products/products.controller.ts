import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { PRODUCT_SERVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productServiceClient: ClientProxy
  ) { }

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productServiceClient.send({ cmd: 'create_product' }, createProductDto).pipe(
      catchError((error) => { throw new RpcException(error) })
    );
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.productServiceClient.send({ cmd: 'find_all_product' }, paginationDto).pipe(
      catchError((error) => { throw new RpcException(error) })
    );
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const product = await firstValueFrom(
        this.productServiceClient.send({ cmd: 'find_one_product' }, { id })
      );
      return product;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productServiceClient.send({ cmd: 'delete_product' }, { id }).pipe(
      catchError((error) => { throw new RpcException(error) })
    );
  }

  @Patch(':id')
  patchProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto) {
    return this.productServiceClient.send({ cmd: 'update_product' }, { id, ...updateProductDto }).pipe(
      catchError((error) => { throw new RpcException(error) })
    );
  }
}
