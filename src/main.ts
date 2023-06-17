import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Datastore } from './store/datastore';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  Datastore.seed();

  const config = new DocumentBuilder()
    .setTitle('aXmos Home Hub API')
    .setDescription('An api used to toggle device states in the home')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('', app, document);

  await app.listen(3000);
}
bootstrap();
