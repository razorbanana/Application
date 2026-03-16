import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cors from "cors"
import { CatchEverythingFilter } from './utils/filters/catch-everything.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors())
  app.useGlobalFilters(new CatchEverythingFilter(app.get(HttpAdapterHost)))

  const config = new DocumentBuilder()
    .setTitle('Application')
    .setDescription('Event Management System')
    .setVersion('1.0')
    .addTag('events')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
