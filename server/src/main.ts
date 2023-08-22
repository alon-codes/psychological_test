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
    origin: ['https://psychological-test-react-client.vercel.app'],
    secure: true,
    exposedHeaders: ['Content-Range', 'X-Content-Range', 'Access-Control-Allow-Origin']
  });

  app.options('/*', (_, res) => {
      res.sendStatus(200);
  });
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
