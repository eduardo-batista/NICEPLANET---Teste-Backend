import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';

export class UpdatePropertyDto {
    @IsString()
    @ApiProperty()
    @IsOptional()
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
    @IsOptional()
    @MinLength(3, {
        message: 'O Cadastro Rural possui 13 caracteres'
    })
    @MaxLength(30, {
        message: 'O Cadastro Rural possui 13 caracteres'
    })
    @ApiProperty({
        default: '1234567898765',
    })
    agroRegister: string

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        default: '1',
    })
    productorId: number
}