/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  UseGuards,
  Body,
  Put,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { GetUser } from 'src/decorators/get-user.decorator';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private cat: CategoriesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@GetUser() user, @Body() dto: CreateCategoryDto) {
    return this.cat.create(user._id, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  all(@GetUser() user) {
    return this.cat.all(user._id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(
    @GetUser() user,
    @Param('id') id: string,
    @Body() dto: UpdateCategoryDto,
  ) {
    return this.cat.update(user._id, id, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@GetUser() user, @Param('id') id: string) {
    return this.cat.softDelete(user._id, id);
  }
}
