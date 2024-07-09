import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Prisma, Property } from '@prisma/client';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/common/base.controller';

// Anotação do swagger para que as rotas trabalhem com o Bearer Token
@ApiBearerAuth()
// Anotação do swagger que serve como identificador da API
@ApiTags('crud_service')
// controller do domínio de propriedade
@Controller('properties')
export class PropertiesController extends BaseController<Property> {

    constructor(private readonly propertyService: PropertiesService) {
        super();
    }

    @Get()
    @ApiOperation({
        description: 'Método que retorna todas as propriedades.'
    })
    async getAll() {
        return this.propertyService.getAll()
    }

    @Get(':id')
    @ApiOperation({
        description: 'Método que retorna uma propriedade, pesquisa por ID.'
    })
    async getOne(@Param('id') id: number) {
        return this.propertyService.getOne({ idProperty: Number(id) })
    }

    @Post()
    @ApiOperation({
        description: 'Método que cadastra uma propriedade.'
    })
    async create(@Body() body: CreatePropertyDto) {
        try {
            const {
                nameProperty, agroRegister, productorId
            } = body
            return this.propertyService.create({
                nameProperty, agroRegister, productor: {
                    connect: { idProductor: productorId }
                }
            })
        } catch (error) {
            console.log('_________________' + error)
        }
    }

    @Patch(':id')
    @ApiOperation({
        description: 'Método que altera uma propriedade.'
    })
    async update(@Param('id') id: number, @Body() body: UpdatePropertyDto) {
        const data: Prisma.PropertyUpdateInput = {};

        if (body.nameProperty !== undefined) {
            data.nameProperty = body.nameProperty;
        }

        if (body.agroRegister !== undefined) {
            data.agroRegister = body.agroRegister;
        }

        if (body.productorId !== undefined) {
            data.productor = {
                connect: {
                    idProductor: body.productorId,
                },
            };
        }

        return this.propertyService.update({
            where: { idProperty: Number(id) },
            data
        });
    }

    @Delete(':id')
    @ApiOperation({
        description: 'Método que deleta uma propriedade.'
    })
    async delete(@Param('id') id: number) {
        return this.propertyService.delete({ idProperty: Number(id) });
    }

}
