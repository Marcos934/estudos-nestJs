import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway/gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  const port = 3000;
  await app.listen(port);
  console.log(`Gateway is running on: http://localhost:${port}`);
}
bootstrap();
