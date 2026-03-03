import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cors from "cors"
import { CatchEverythingFilter } from './utils/filters/catch-everything.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors())
  app.useGlobalFilters(new CatchEverythingFilter(app.get(HttpAdapterHost)))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
