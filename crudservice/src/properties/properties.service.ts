import { Injectable } from '@nestjs/common';
import { Prisma, Property } from '@prisma/client';
import { BaseService } from 'src/common/base.service';
import { PrismaService } from 'src/config/prisma.service';

@Injectable()
export class PropertiesService extends BaseService<
    Property,
    Prisma.PropertyCreateInput,
    Prisma.PropertyUpdateInput,
    Prisma.PropertyWhereUniqueInput
> {
    // O PrismaService é injetado no construtor, permitindo o acesso aos métodos do Prisma
    constructor(private prismaService: PrismaService) {
        super();
    }

    // Método para obter todos os registros de propriedades, incluindo os produtores associados
    async getAll(): Promise<Property[] | null> {
        return this.prismaService.property.findMany({ include: { productor: true } });
    }

    // Método para obter um único registro de propriedade com base em uma entrada única
    async getOne(data: Prisma.PropertyWhereUniqueInput): Promise<Property | null> {
        return this.prismaService.property.findUnique({ where: data, include: { productor: true } });
    }

    // Método para criar um novo registro de propriedade
    async create(data: Prisma.PropertyCreateInput): Promise<Property> {
        return this.prismaService.property.create({ data });
    }

    // Método para atualizar um registro de propriedade existente
    async update(params: {
        where: Prisma.PropertyWhereUniqueInput;
        data: Prisma.PropertyUpdateInput;
    }): Promise<Property> {
        const { where, data } = params;
        return this.prismaService.property.update({ where, data });
    }

    // Método para deletar um registro de propriedade com base em uma entrada única
    async delete(where: Prisma.PropertyWhereUniqueInput) {
        return this.prismaService.property.delete({ where });
    }
}
