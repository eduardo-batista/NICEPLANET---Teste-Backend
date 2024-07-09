import { Controller, Get, Param, Res } from '@nestjs/common';
import { ReportService } from './report.service';
import { Response } from 'express';
import { ApiBearerAuth, ApiOperation, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';

// Anotação do swagger para que as rotas trabalhem com o Bearer Token
@ApiBearerAuth()
// Anotação do swagger que serve como identificador da API
@ApiTags('crud_service')
// controller do domínio de Relatórios
@Controller('report')
export class ReportController {
    constructor(private readonly reportService: ReportService) { }

    @Get(':productorId')
    @ApiOperation({ description: 'Gera um relatório PDF com as informações de um produtor, busca por ID.' })
    @ApiProduces('application/pdf')
    @ApiResponse({
        description: 'O PDF foi gerado com sucesso!.',
        content: { 'application/pdf': { schema: { type: 'string', format: 'binary' } } },
    })
    async createReport(@Res() res: Response, @Param('productorId') productorId: number) {
        const pdfDoc = await this.reportService.createReport(Number(productorId));

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=report.pdf');

        pdfDoc.pipe(res);
        pdfDoc.end();
    }
}
