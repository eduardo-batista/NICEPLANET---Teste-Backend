import { Body, Injectable, Param } from "@nestjs/common";
import { CreateProductorDto } from "src/productor/dto/create-productor.dto";
import { UpdateProductorDto } from "src/productor/dto/update-productor.dto";
import { CreatePropertyDto } from "src/properties/dto/create-property.dto";
import { UpdatePropertyDto } from "src/properties/dto/update-property.dto";

// Tipos aceitos de parâmetro para o create
type CreateParams = CreatePropertyDto | CreateProductorDto;

// Tipos aceitos de parâmetro para o update
type UpdateParams = UpdatePropertyDto | UpdateProductorDto;

// Classe pai de onde extendem os controllers
@Injectable()
export abstract class BaseController<Return> {
    abstract getAll(): Promise<Return[] | null>;
    abstract getOne(id: number): Promise<Return | null>;
    abstract create(body: CreateParams): Promise<Return | null>;
    abstract update(id: number, body: UpdateParams): Promise<Return | null>;
    abstract delete(id: number): Promise<Return | null>;
}