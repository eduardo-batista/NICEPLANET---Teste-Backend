import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    // Método que é chamado quando o módulo é inicializado
    async onModuleInit() {
        try {
            // Tenta conectar ao banco de dados usando Prisma
            await this.$connect();
        } catch (error) {
            // Em caso de erro na conexão, imprime o erro no console
            console.error('PRISMA: ' + error);
        }
    }
}