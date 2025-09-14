import { Module } from '@nestjs/common';
import { RabbitMQModule } from '../rabbitmq/rabbitmq.module';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [RabbitMQModule, PrismaModule],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}
