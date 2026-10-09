import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Prisma connection clean close karne ke liye shutdown hooks enable karein
  app.enableShutdownHooks();

  // Global API prefix set karne ke liye (Optional: e.g., http://localhost:3000/api/users)
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 Application is running on: ${await app.getUrl()}`);
}
bootstrap();
