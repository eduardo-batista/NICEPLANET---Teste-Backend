import { IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// Data Transfer Object do método de criação de usuário. Validações são definidas aqui.
export class CreateUserDto {
    @IsString()
    @ApiProperty({
        default: 'user',
    })
    @IsNotEmpty({ message: 'Campo obrigatório' })
    @MinLength(3, {
        message: 'Mínimo de caracteres: 3'
    })
    @MaxLength(30, {
        message: 'Máximo de caracteres: 15'
    })
    nameUser: string

    @ApiProperty({
        default: '@Password1'
    })
    @IsStrongPassword({
        minLength: 4,
        minLowercase: 1,
        minNumbers: 1,
        minUppercase: 1,
        minSymbols: 1,
    }, {
        message: 'Digite uma senha forte'
    })
    @IsNotEmpty({ message: 'Campo obrigatório' })
    passwordUser: string
}