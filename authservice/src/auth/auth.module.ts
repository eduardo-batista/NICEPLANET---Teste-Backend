import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/config/prisma.service';

// Decorador que define a classe AuthModule como um módulo do NestJS
@Module({
  // Lista de módulos importados que são utilizados neste módulo
  imports: [
    PassportModule, // Módulo Passport para autenticação
    // Configuração do módulo JWT com opções de registro
    JwtModule.register({
      secret: 'secret', // Chave secreta para assinatura de tokens JWT
      signOptions: { expiresIn: '1h' } // Opções de assinatura de tokens, com expiração de 1 hora
    }),
  ],
  // Lista de controladores definidos para este módulo
  controllers: [AuthController],
  // Lista de provedores de serviços definidos para este módulo
  providers: [AuthService, PrismaService]
})
// Classe principal do módulo AuthModule
export class AuthModule { }
