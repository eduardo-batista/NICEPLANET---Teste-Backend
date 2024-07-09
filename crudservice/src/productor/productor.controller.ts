import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductorService } from './productor.service';
import { CreateProductorDto } from './dto/create-productor.dto';
import { UpdateProductorDto } from './dto/update-productor.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/common/base.controller';
import { Productor } from '@prisma/client';

// Anotação do swagger para que as rotas trabalhem com o Bearer Token
@ApiBearerAuth()
// Anotação do swagger que serve como identificador da API
@ApiTags('crud_service')
// controller do domínio de produtor
@Controller('productor')
export class ProductorController extends BaseController<Productor> {

    constructor(private readonly productorService: ProductorService) {
        super();
    }

    @Get()
    @ApiOperation({
        description: 'Método que retorna todas os produtores.'
    })
    getAll() {
        return this.productorService.getAll()
    }

    @Get(':id')
    @ApiOperation({
        description: 'Método que retorna um produtor, pesquisa por ID.'
    })
    getOne(@Param('id') id: number) {
        return this.productorService.getOne({ idProductor: Number(id) })
    }

    @Post()
    @ApiOperation({
        description: 'Método que cadastra um produtor.'
    })
    create(@Body() body: CreateProductorDto) {
        return this.productorService.create(body)
    }

    @Patch(':id')
    @ApiOperation({
        description: 'Método que altera um produtor.'
    })
    async update(@Param('id') id: number, @Body() body: UpdateProductorDto) {
        const {
            nameProductor, cpfProductor
        } = body
        return this.productorService.update({
            where: { idProductor: Number(id) },
            data: {
                nameProductor, cpfProductor
            }
        })
    }

    @Delete(':id')
    @ApiOperation({
        description: 'Método que deleta um produtor.'
    })
    delete(@Param('id') id: number) {
        return this.productorService.delete({ idProductor: Number(id) });
    }
}
