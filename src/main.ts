import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger: ['log', 'fatal', 'error', 'warn', 'debug', 'verbose']
  });
  app.enableCors();
  await app.listen(5000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap().then(() => Logger.log('Service listening 👍 3000', "Main"));
