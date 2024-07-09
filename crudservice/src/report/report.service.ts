import { Injectable } from '@nestjs/common';
import PdfPrinter from 'pdfmake';
import { BufferOptions, TDocumentDefinitions } from 'pdfmake/interfaces';
import { PrismaService } from 'src/config/prisma.service';

// Decorador que marca a classe ReportService como injetável pelo NestJS
@Injectable()
export class ReportService {
    // Construtor que injeta a dependência PrismaService
    constructor(private readonly prismaService: PrismaService) { }

    // Método para criar um relatório PDF de um produtor específico
    async createReport(productorId: number): Promise<PDFKit.PDFDocument> {
        // Busca o produtor no banco de dados, incluindo suas propriedades
        const productor = await this.prismaService.productor.findUnique({
            where: { idProductor: productorId },
            include: { properties: true }
        });

        // Definição das fontes utilizadas no PDF
        const fonts = {
            Roboto: {
                normal: 'fonts/Roboto-Regular.ttf',
                bold: 'fonts/Roboto-Medium.ttf',
                italics: 'fonts/Roboto-Italic.ttf',
                bolditalics: 'fonts/Roboto-MediumItalic.ttf'
            }
        };

        // Criação de uma nova instância do PdfPrinter com as fontes definidas
        const printer = new PdfPrinter(fonts);

        // Definição do conteúdo do documento PDF
        const docDefinition: TDocumentDefinitions = {
            content: [
                {
                    text: `Produtor: ${productor.nameProductor}`,
                    style: 'header',
                    fontSize: 20,
                    marginBottom: 10
                },
                {
                    text: `CPF: ${productor.cpfProductor}`,
                    fontSize: 12,
                    marginBottom: 10
                },
                {
                    text: 'Propriedades',
                    style: 'header'
                },
                {
                    ul: productor.properties.map(property => property.nameProperty)
                }
            ]
        };

        // Opções de buffer para a criação do PDF (aqui não há opções adicionais definidas)
        const options: BufferOptions = {};

        // Criação e retorno do documento PDF utilizando o PdfPrinter
        return printer.createPdfKitDocument(docDefinition, options);
    }
}