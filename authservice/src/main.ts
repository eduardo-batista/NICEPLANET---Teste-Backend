import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // Cria uma aplicação NestJS a partir do módulo principal (AppModule)
  const app = await NestFactory.create(AppModule);

  // Usa um pipe global de validação para validar automaticamente os dados de entrada
  app.useGlobalPipes(new ValidationPipe())

  // Configura a documentação Swagger para a API
  const config = new DocumentBuilder()
    .setTitle('Auth API') // Título da documentação
    .setDescription('Documentação da API de Autenticação') // Descrição da documentação
    .setVersion('1.0') // Versão da API
    .addTag('auth_service') // Adiciona uma tag para categorizar os endpoints
    .build();

  // Cria o documento Swagger a partir da aplicação e das configurações fornecidas
  const document = SwaggerModule.createDocument(app, config);

  // Configura o Swagger na rota '/api' e define a URL para o documento JSON
  SwaggerModule.setup('api', app, document, {
    jsonDocumentUrl: 'api/json',
  });

  // Inicia o servidor na porta 3000
  await app.listen(3000);
}

// Chama a função bootstrap para iniciar a aplicação
bootstrap();
