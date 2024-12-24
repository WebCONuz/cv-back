import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function start() {
  // create app
  const app = await NestFactory.create(AppModule);

  // global validation
  app.useGlobalPipes(new ValidationPipe());

  // create swagger
  const config = new DocumentBuilder()
    .setTitle('CLEANING APP')
    .setDescription('The Cleaning API description')
    .setVersion('1.0')
    .addTag('Cleaning')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, documentFactory);

  // global prefix
  app.setGlobalPrefix('api');

  // listen app
  const port = process.env.PORT ?? 3001;
  await app.listen(port, () => {
    console.log(`Dastur ${port}-portda ishga tushdi`);
  });
}
start();
