// Importações necessárias das bibliotecas e módulos utilizados
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import * as crypto from 'crypto';
import { PrismaService } from 'src/config/prisma.service';

// Tipo de mensagem recebida do serviço CRUD (Protocolo RPC)
type MsgFromCrud = {
    token: string;
}

// Decorador que marca a classe AuthService como injetável pelo NestJS
@Injectable()
export class AuthService {
    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService,
    ) { }

    // Método para registrar um novo usuário
    async register(data: Prisma.UserCreateInput) {
        // Hash da senha do usuário antes de salvar no banco de dados
        data.passwordUser = this.hashPassword(data.passwordUser);

        // Criação do usuário no banco de dados usando o PrismaService
        const user = await this.prismaService.user.create({ data });

        // Retorno de uma resposta de sucesso com dados do usuário criado
        return {
            status: 'success',
            message: 'User registrado com Sucesso!',
            data: {
                idUser: user.idUser,
                nameUser: user.nameUser,
            }
        };
    }

    // Método para realizar login
    async login(nameUser: string, passwordUser: string) {
        // Busca do usuário no banco de dados pelo nome
        const user = await this.prismaService.user.findUnique({
            where: { nameUser },
        });

        // Verificação se o usuário existe e se a senha está correta
        if (!user || !this.verifyPassword(passwordUser, user.passwordUser)) {
            throw new UnauthorizedException('Credenciais Inválidas');
        }

        // Criação do payload e geração do token JWT
        const payload = { username: user.nameUser, sub: user.idUser };
        const token = this.jwtService.sign(payload);

        // Retorno de uma resposta de sucesso com o token gerado
        return {
            status: 'Sucesso',
            message: 'Login efetuado!',
            data: {
                access_token: token,
            }
        };
    }

    // Método para validar um token (consulta)
    async validateTokenRoute(token: string) {
        try {
            // Verificação do token JWT
            const decoded = this.jwtService.verify(token);
            // Retorno de uma resposta de sucesso se o token é válido
            return {
                status: 'Successo',
                message: 'Token é válido',
                data: decoded,
            };
        } catch (error) {
            // Exceção lançada se o token for inválido
            throw new UnauthorizedException('Token inválido!');
        }
    }

    // Método decorado com RabbitRPC para validar um token através de uma fila RabbitMQ
    @RabbitRPC({
        exchange: 'exchange_service',
        routingKey: 'auth_service',
        queue: 'validate_token',
    })
    async validateTokenQueue(msg: MsgFromCrud) {
        try {
            // Extração do token da mensagem recebida
            const { token } = msg

            // Verificação do token JWT
            this.jwtService.verify(token);

            // Retorno de uma resposta indicando que o token é válido
            return { isValid: true };
        } catch (error) {
            // Retorno de uma resposta indicando que o token é inválido
            return { isValid: false };
        }
    }


    // Método privado para hash de senhas usando o algoritmo SHA-256
    private hashPassword(password: string): string {
        return crypto.createHash('sha256').update(password).digest('hex');
    }

    // Método privado para verificar se a senha corresponde ao hash armazenado
    private verifyPassword(password: string, hashedPassword: string): boolean {
        const hashedInputPassword = this.hashPassword(password);
        return hashedInputPassword === hashedPassword;
    }
}
