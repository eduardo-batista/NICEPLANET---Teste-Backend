import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { PropertiesModule } from './properties/properties.module';
import { ProductorModule } from './productor/productor.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './common/response.interceptor';
import { ConfigModule } from '@nestjs/config';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { TokenValidationMiddleware } from './middleware/token-validation.middleware';
import { ReportModule } from './report/report.module';

@Module({
  imports: [PropertiesModule, ProductorModule,
    ConfigModule.forRoot(),
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'exchange_service',
          type: 'direct',
        },
      ],
      uri: `amqp://guest:guest@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`,
    }),
    ReportModule],
  controllers: [],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor }
  ]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenValidationMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
