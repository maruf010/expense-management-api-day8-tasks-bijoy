/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import {
  Injectable,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { slugify } from 'src/shared/utils/slugit.util';
import { Category } from './schema/category.schema';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private catModel: Model<Category>) {}

  async create(userId: string, dto: any) {
    const slug = slugify(dto.name);
    try {
      const c = new this.catModel({
        userId: new Types.ObjectId(userId),
        name: dto.name,
        slug,
        color: dto.color,
        icon: dto.icon,
      });
      return await c.save();
    } catch (e) {
      if (e.code === 11000) throw new ConflictException('CATEGORY_DUPLICATE');
      throw e;
    }
  }

  async update(userId: string, id: string, dto: any) {
    const cat = await this.catModel.findOne({
      _id: id,
      userId: new Types.ObjectId(userId),
      isDeleted: false,
    });
    if (!cat) throw new BadRequestException('Category not found');
    if (dto.name) {
      cat.name = dto.name;
      cat.slug = slugify(dto.name);
    }
    if (dto.color) cat.color = dto.color;
    if (dto.icon) cat.icon = dto.icon;
    try {
      return await cat.save();
    } catch (e) {
      if (e.code === 11000) throw new ConflictException('CATEGORY_DUPLICATE');
      throw e;
    }
  }

  async softDelete(userId: string, id: string) {
    const cat = await this.catModel.findOne({
      _id: id,
      userId: new Types.ObjectId(userId),
      isDeleted: false,
    });
    if (!cat) throw new BadRequestException('Category not found');
    cat.isDeleted = true;
    cat.deletedAt = new Date();
    await cat.save();
    return { success: true };
  }

  async all(userId: string) {
    return this.catModel
      .find({ userId: new Types.ObjectId(userId), isDeleted: false })
      .lean();
  }

  async findByIdForUser(userId: string, id: string) {
    return this.catModel
      .findOne({
        _id: id,
        userId: new Types.ObjectId(userId),
        isDeleted: false,
      })
      .lean();
  }
}
