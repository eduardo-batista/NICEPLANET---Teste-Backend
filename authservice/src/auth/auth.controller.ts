import { Body, Controller, Get, Headers, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

// Anotação do swagger que serve como identificador da API
@ApiTags('auth_service')
// controller do domínio de autenticação
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @ApiOperation({
        description: 'Método de Cadastro de Usuário.'
    })
    @Post('register')
    async register(@Body() body: CreateUserDto) {
        return this.authService.register(body);
    }

    @Post('login')
    @ApiOperation({
        description: 'Método de Login.'
    })
    async login(@Body() body: CreateUserDto) {
        const { nameUser, passwordUser } = body
        return this.authService.login(nameUser, passwordUser);
    }

    @Get('validate-token')
    @ApiOperation({
        description: 'Método de Verificação de Token (Consulta).'
    })
    async validateToken(@Headers('Authorization') authHeader: string) {
        const token = authHeader.split(' ')[1];

        if (!token) {
            throw new UnauthorizedException('Token not found');
        }
        return this.authService.validateTokenRoute(token);
    }
}
