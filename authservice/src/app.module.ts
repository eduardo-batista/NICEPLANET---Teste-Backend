import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { PrismaService } from './config/prisma.service';
import { AuthService } from './auth/auth.service';

// Decorador que define a classe AppModule como um módulo do NestJS
@Module({
  // Lista de módulos importados que são utilizados neste módulo
  imports: [
    AuthModule, // Módulo de autenticação
    ConfigModule.forRoot(), // Módulo de configuração para carregar variáveis de ambiente
    // Configuração do módulo RabbitMQ com suas especificações
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'exchange_service', // Nome da exchange RabbitMQ
          type: 'direct', // Tipo da exchange RabbitMQ
        },
      ],
      // URI de conexão com o servidor RabbitMQ, utilizando variáveis de ambiente
      uri: `amqp://guest:guest@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`,
    })
  ],
})
// Classe principal do módulo AppModule
export class AppModule { }