import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './common/response.interceptor';

async function bootstrap() {
  // Cria uma aplicação NestJS a partir do módulo principal (AppModule)
  const app = await NestFactory.create(AppModule);

  // Usa um pipe global de validação para validar automaticamente os dados de entrada
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new PrismaClientExceptionFilter())

  // Configura a documentação Swagger para a API
  const config = new DocumentBuilder()
    .setTitle('crud_service') // Define o título da documentação da API
    .setDescription('Documentação do serviço de CRUD') // Define a descrição da documentação da API
    .setVersion('1.0') // Define a versão da API
    .addBearerAuth() // Adiciona autenticação Bearer à documentação da API
    .addTag('crud_service') // Adiciona uma tag para categorizar os endpoints da API
    .build(); // Constrói o objeto de configuração

  // Cria o documento Swagger a partir da aplicação e das configurações fornecidas
  const document = SwaggerModule.createDocument(app, config);

  // Configura o Swagger na rota '/api' e define a URL para o documento JSON
  SwaggerModule.setup('api', app, document, { jsonDocumentUrl: 'api/json' });

  // Inicia o servidor na porta 3000
  await app.listen(3000);
}

// Chama a função bootstrap para iniciar a aplicação
bootstrap();