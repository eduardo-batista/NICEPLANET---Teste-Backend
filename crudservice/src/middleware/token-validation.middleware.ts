import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// Tipo de resposta esperada da validação do token através da resposta do metodo recebido pelo protocolo RPC
type ValidateTokenResponse = {
    isValid: boolean;
}

// Decorador que marca a classe TokenValidationMiddleware como injetável pelo NestJS
@Injectable()
// Middleware para validação de token
export class TokenValidationMiddleware implements NestMiddleware {
    // Construtor que injeta a dependência AmqpConnection
    constructor(private readonly amqpConnection: AmqpConnection) { }

    // Método 'use' que será executado para cada requisição que utilizar este middleware
    async use(req: Request, res: Response, next: NextFunction) {
        // Obtém o header de autorização da requisição
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            // Lança exceção se o header de autorização não estiver presente
            throw new UnauthorizedException('Não autorizado!');
        }

        // Extrai o token do header de autorização
        const token = authHeader.replace('Bearer ', '');

        // Faz a solicitação de validação do token via RabbitMQ
        const result = await this.amqpConnection.request<ValidateTokenResponse>({
            exchange: 'exchange_service',
            routingKey: 'auth_service',
            payload: { token },
            timeout: 10000,
        });

        // Log do resultado da validação do token
        console.log(`Result: ${JSON.stringify(result)}`);

        // Verifica se o token é inválido e lança exceção se for o caso
        if (!result.isValid) {
            throw new UnauthorizedException('Token de Login Inválido!');
        }
        // Continua para o próximo middleware ou rota
        next();
    }
}