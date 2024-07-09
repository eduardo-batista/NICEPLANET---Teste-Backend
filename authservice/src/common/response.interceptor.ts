import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Catch(PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
    catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = exception.message;

        // Tratar erros
        switch (exception.code) {
            // Tratar erro de parametros unicos já cadastrados
            case 'P2002':
                status = HttpStatus.CONFLICT;
                message = `Já cadastrado: ${exception.meta.target}`;
                break;
            case 'P2025':
                status = HttpStatus.NOT_FOUND;
                message = `Não existe: ${exception.meta.cause}`;
                break;
            default:
                if (exception.message.includes('Foreign key constraint failed')) {
                    status = HttpStatus.BAD_REQUEST;
                    message = `Produtor possui propriedades!`;
                }
                break
        }

        response.status(status).json({
            statusCode: status,
            message: message,
        });
    }
}