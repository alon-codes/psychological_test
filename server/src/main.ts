import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('Quiz API documention')
    .setDescription('Quiz API documention')
    .setVersion('1.0')
    .build();

  app.enableCors({
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'OPTIONS'],
    origin: '*',
  });

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
