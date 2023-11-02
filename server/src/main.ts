import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import dotenv from 'dotenv';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { createServer } from 'http';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new IoAdapter(app));
  app.enableCors({
    origin: ['http://localhost:3000', 'https://kns-support.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    credentials: true,
    exposedHeaders: ['Authorization'],
  });
  app.use(cookieParser());
  await app.listen(8000);
}
bootstrap();
