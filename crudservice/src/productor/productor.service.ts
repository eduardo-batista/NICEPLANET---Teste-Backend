import { Injectable } from '@nestjs/common';
import { Prisma, Productor } from '@prisma/client';
import { BaseService } from 'src/common/base.service';
import { PrismaService } from 'src/config/prisma.service';

@Injectable()
export class ProductorService extends BaseService<
    Productor,
    Prisma.ProductorCreateInput,
    Prisma.ProductorUpdateInput,
    Prisma.ProductorWhereUniqueInput
> {
    // O PrismaService é injetado no construtor, permitindo o acesso aos métodos do Prisma
    constructor(private prismaService: PrismaService) {
        super();
    }

    // Método para obter todos os registros de produtores, incluindo suas propriedades
    async getAll(): Promise<Productor[] | null> {
        return this.prismaService.productor.findMany({ include: { properties: true } });
    }

    // Método para obter um único registro de produtor com base em uma entrada única
    async getOne(data: Prisma.ProductorWhereUniqueInput): Promise<Productor | null> {
        return this.prismaService.productor.findUnique({ where: data, include: { properties: true } });
    }

    // Método para criar um novo registro de produtor
    async create(data: Prisma.ProductorCreateInput): Promise<Productor> {
        return this.prismaService.productor.create({ data });
    }

    // Método para atualizar um registro de produtor existente
    async update(params: {
        where: Prisma.ProductorWhereUniqueInput;
        data: Prisma.ProductorUpdateInput;
    }): Promise<Productor> {
        const { where, data } = params;
        return this.prismaService.productor.update({ where, data });
    }

    // Método para deletar um registro de produtor com base em uma entrada única
    async delete(where: Prisma.ProductorWhereUniqueInput) {
        return this.prismaService.productor.delete({ where });
    }
}