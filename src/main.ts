import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as basicAuth from 'express-basic-auth';

async function start() {
  // create app
  const app = await NestFactory.create(AppModule);

  // global validation
  app.useGlobalPipes(new ValidationPipe());

  // add auth to read swagger docs
  app.use(
    ['/api/docs'],
    basicAuth({
      users: { kottaAdmin: '12345' },
      challenge: true,
    }),
  );

  // create swagger
  const config = new DocumentBuilder()
    .setTitle('CV-maker')
    .setDescription('CV maker app backend')
    .setVersion('1.0')
    .addTag('CV')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, documentFactory);

  // cookie-parser
  app.use(cookieParser());

  // global prefix
  app.setGlobalPrefix('api');

  // listen app
  const port = process.env.PORT ?? 3001;
  await app.listen(port, () => {
    console.log(`Dastur ${port}-portda ishga tushdi`);
  });
}
start();
