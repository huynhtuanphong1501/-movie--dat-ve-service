import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { RABBITMQ_URL } from './common/constants/app.constant';


async function bootstrap() {
  console.log("[Microservice] dat ve service");
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [RABBITMQ_URL!],
      queue: 'datVe_queue',
      queueOptions: {
        durable: true,
      },
      socketOptions: {
        connectionOptions: {
          clientProperties: {
            connection_name: 'datVe-service',
          },
        },
      },
    },
  });
  await app.listen();
}
bootstrap();
