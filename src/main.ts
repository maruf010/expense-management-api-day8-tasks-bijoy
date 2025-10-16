/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import morgan from 'morgan';

async function bootstrap() {
  // Load environment variables
  dotenv.config();

  // Create NestJS app
  const app = await NestFactory.create(AppModule);

  // Enable CORS (for frontend access)
  app.enableCors({
    origin: '*',
    credentials: true,
  });

  // Global API prefix
  app.setGlobalPrefix('api/v1');

  // Logger middleware
  app.use(morgan('dev'));

  // Global validation pipe for DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove extra fields
      forbidNonWhitelisted: true, // throw error for unknown fields
      transform: true, // auto-transform input types
    }),
  );

  // Swagger documentation setup
  const config = new DocumentBuilder()
    .setTitle('Expense Management API')
    .setDescription('NestJS + MongoDB Expense Tracker (Day 8 Pro Features)')
    .setVersion('1.0')
    .addBearerAuth() // add Authorization header support
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Run server
  const port = process.env.PORT || 5000;
  await app.listen(port);

  console.log(`🚀 Server running on http://localhost:${port}/api/v1`);
  console.log(`📘 Swagger docs available at http://localhost:${port}/api/docs`);
}

bootstrap();
