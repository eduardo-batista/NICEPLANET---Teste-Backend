import { PrismaClient } from "@prisma/client";
import { pt_BR, Faker, faker } from '@faker-js/faker';

// Instância do cliente Prisma para interagir com o banco de dados
const prisma = new PrismaClient();

// Função para gerar um número de CCIR (Registro de Imóvel Rural) aleatório com 13 dígitos
const generateCcir = (): string => {
    const ccirArray = Array.from({ length: 13 }, () => faker.datatype.number({ min: 0, max: 9 }));
    return ccirArray.join('');
};

// Função para calcular um dígito verificador de CPF com base em uma sequência de números
const calculateCpfDigit = (cpf: number[]): number => {
    const length = cpf.length + 1;
    const sum = cpf
        .map((num, index) => num * (length - index))
        .reduce((acc, curr) => acc + curr, 0);
    const digit = 11 - (sum % 11);
    return digit > 9 ? 0 : digit;
};

// Função para gerar um CPF aleatório e válido
const generateCpf = (): string => {
    const cpfArray = Array.from({ length: 9 }, () => faker.datatype.number({ min: 0, max: 9 }));
    cpfArray.push(calculateCpfDigit(cpfArray));
    cpfArray.push(calculateCpfDigit(cpfArray));
    return cpfArray.join('').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

// Função principal para executar o seeding do banco de dados
async function main() {
    // Configuração do faker com a localidade brasileira
    const faker = new Faker({
        locale: [pt_BR],
    });

    // Criação/atualização de 10 produtores com dados fictícios
    for (let index = 1; index <= 10; index++) {
        const productor = await prisma.productor.upsert({
            where: { idProductor: index },
            update: {},
            create: {
                cpfProductor: generateCpf(),
                nameProductor: faker.person.firstName(),
            }
        });
        console.log({ productor });
    }

    // Criação/atualização de 10 propriedades com dados fictícios
    for (let index = 1; index <= 10; index++) {
        const property = await prisma.property.upsert({
            where: { idProperty: index },
            update: {},
            create: {
                agroRegister: generateCcir(),
                nameProperty: `Propriedade: ${faker.location.city()}`,
                productorId: index
            }
        });
        console.log({ property });
    }
}

// Execução da função principal e desconexão do cliente Prisma
main().then(async () => {
    await prisma.$disconnect();
    console.log("Seed executado com sucesso!");
}).catch(async (error) => {
    await prisma.$disconnect();
    console.error(error);
});