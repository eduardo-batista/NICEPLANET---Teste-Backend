import { ArgumentsHost, CallHandler, Catch, ExceptionFilter, ExecutionContext, HttpStatus, NestInterceptor } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { map, Observable } from "rxjs";

// Interceptor personalizado para modificar a resposta HTTP padrão
export class ResponseInterceptor implements NestInterceptor {
    // Método intercept que será chamado automaticamente para todas as requisições
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        // Obtém o objeto de resposta HTTP do contexto de execução
        const response = context.switchToHttp().getResponse();
        // verifica se o status é de sucesso (está na faixa entre 200 e 399)
        const isSuccessStatus = response.statusCode >= 200 && response.statusCode < 400;
        // Continua o fluxo da requisição e modifica a resposta usando o operador 'map'
        return next.handle().pipe(
            map((data, index) => ({
                // Adiciona o status code da resposta HTTP
                statusCode: response.statusCode,
                // Define um status fixo de 'success'
                status: isSuccessStatus ? 'success' : 'error',
                // Inclui os dados da resposta original
                data
            }))
        )
    }
}

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