import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Quiz API documention')
    .setDescription('Quiz API documention')
    .setVersion('1.0')
    .build();

  app.enableCors({
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'OPTIONS', 'DELETE'],
    allowedHeaders: 'origin, content-type, accept, application/json',
    origin: ['https://psychological-test-react-client.vercel.app'],
    secure: true,
    sameSite: 'none',
    preflightContinue: false
  });
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
