import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';

// Data Transfer Object do método de criação de produtor. Validações são definidas aqui.
export class CreateProductorDto {
    @IsString()
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
    @IsNotEmpty({ message: 'Campo obrigatório' })
    @MinLength(14, {
        message: 'O cpf possui 14 caracteres'
    })
    @ApiProperty()
    @MaxLength(14, {
        message: 'O cpf possui 14 caracteres'
    })
    @ApiProperty({
        default: '111.222.333-44',
    })
    cpfProductor: string

}