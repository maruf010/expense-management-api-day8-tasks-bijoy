/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadsService } from './uploads.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { GetUser } from 'src/decorators/get-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post('receipt')
  @UseInterceptors(
    FileInterceptor('file', new UploadsService().getMulterOptions()),
  )
  uploadReceipt(
    @GetUser('_id') userId,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const fileData = {
      fileId: file.filename,
      url: `/uploads/receipts/${file.filename}`,
      mime: file.mimetype,
      size: file.size,
      userId,
    };
    return fileData;
  }
}
