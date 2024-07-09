import { Body, Controller, Get, Headers, Post, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

// Anotação do swagger que serve como identificador da API
@ApiTags('auth_service')
// controller do domínio de autenticação
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @ApiOperation({
        description: 'Método de Cadastro de Usuário. OBS: NÃO é necessário inserir token no "Authorize" no cabeçalho da página. Este é apenas para o método de consulta de validação do token.'
    })
    @Post('register')
    async register(@Body() body: CreateUserDto) {
        return this.authService.register(body);
    }

    @Post('login')
    @ApiOperation({
        description: 'Método de Login. OBS: NÃO é necessário inserir token no "Authorize" no cabeçalho da página. Este é apenas para o método de consulta de validação do token.'
    })
    async login(@Body() body: CreateUserDto) {
        const { nameUser, passwordUser } = body
        return this.authService.login(nameUser, passwordUser);
    }

    // Anotação do swagger para que as rotas trabalhem com o Bearer Token
    @ApiBearerAuth()
    @Get('validate-token')
    @ApiOperation({
        description: 'Método de Verificação de Token (Consulta), insira o token no "Authorize" no cabeçalho da página.'
    })
    async validateToken(@Req() request: Request) {
        const { authorization } = request.headers
        const token = authorization.split(' ')[1];

        if (!token) {
            throw new UnauthorizedException('Token not found');
        }
        return this.authService.validateTokenRoute(token);
    }
}
