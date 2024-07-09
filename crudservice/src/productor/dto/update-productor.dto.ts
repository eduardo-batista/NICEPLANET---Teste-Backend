import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';

// Data Transfer Object do método de modificação de produtor. Validações são definidas aqui.
export class UpdateProductorDto {
    @IsString()
    @IsOptional()
    @ApiProperty()
    @IsNotEmpty({ message: 'Campo obrigatório' })
    @MinLength(3, {
        message: 'Mínimo de caracteres: 2'
    })
    @MaxLength(30, {
        message: 'Máximo de caracteres: 30'
    })
    @ApiProperty({
        default: 'Seu zé',
    })
    nameProductor: string

    @IsString()
    @IsOptional()
    @ApiProperty()
    @MinLength(3, {
        message: 'O Cadastro Rural possui 11 caracteres'
    })
    @MaxLength(30, {
        message: 'O Cadastro Rural possui 11 caracteres'
    })
    @ApiProperty({
        default: '111.222.333-44',
    })
    cpfProductor: string

}