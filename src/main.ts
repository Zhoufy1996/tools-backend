import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as fs from 'fs';
import * as path from 'path';
import { readConfig } from './core/utils/config';

declare const module: any;

const httpsOptions = {
  key: fs.readFileSync(path.join(process.cwd(), 'privkey.pem'), 'utf8'),
  cert: fs.readFileSync(path.join(process.cwd(), 'server.crt'), 'utf8'),
};
const config = readConfig();
async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    config.env === 'development'
      ? {}
      : {
          httpsOptions,
        },
  );
  app.use(helmet());
  console.log(config.origin);
  app.enableCors({
    origin: config.origin,
    // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // preflightContinue: false,
    // optionsSuccessStatus: 204,
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(4800);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
