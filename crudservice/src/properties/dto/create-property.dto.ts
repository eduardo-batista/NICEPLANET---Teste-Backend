import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsNumber,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';

export class CreatePropertyDto {
    @IsString()
    @ApiProperty()
    @IsNotEmpty({ message: 'Campo obrigatório' })
    @MinLength(3, {
        message: 'Mínimo de caracteres: 3'
    })
    @MaxLength(30, {
        message: 'Máximo de caracteres: 30'
    })
    @ApiProperty({
        default: 'Fazenda do seu zé',
    })
    nameProperty: string

    @IsString()
    @ApiProperty()
    @MinLength(13, {
        message: 'O Cadastro Rural possui 13 caracteres'
    })
    @MaxLength(13, {
        message: 'O Cadastro Rural possui 13 caracteres'
    })
    @ApiProperty({
        default: '1234567898765',
    })
    agroRegister: string

    @IsNumber()
    @ApiProperty({
        default: '1',
    })
    productorId: number
}