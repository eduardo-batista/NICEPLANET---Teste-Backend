import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';

// Classe pai de onde extendem os services
@Injectable()
export abstract class BaseService<T, CreateInput, UpdateInput, WhereUniqueInput> {
    abstract getAll(include?: object): Promise<T[] | null>;

    abstract getOne(data: WhereUniqueInput, include?: object): Promise<T | null>;

    abstract create(data: CreateInput): Promise<T>;

    abstract update(params: { where: WhereUniqueInput; data: UpdateInput }): Promise<T>;

    abstract delete(where: WhereUniqueInput): Promise<T>;
}