import { PrismaClient } from "@prisma/client"; // Importa o cliente Prisma
const prisma = new PrismaClient(); // Cria uma instância do PrismaClient

async function main() {
    // Usa o método upsert do Prisma para o modelo 'usuario'
    const user = await prisma.user.upsert({
        where: { nameUser: "user" }, // Condição para verificar se o usuário já existe
        update: {}, // Dados para atualizar se o usuário já existir (vazio neste caso)
        create: {
            // Dados para criar um novo usuário se ele não existir
            nameUser: "user",
            passwordUser: "c09c55d3132959f34bf689e7cf61ea607b3440d9ffb83bc7e35f006fcfebb657" // senha encriptada
        }
    });

    console.log({ user }); // Exibe o usuário criado ou atualizado
}

// Executa a função principal e trata a desconexão e erros
main().then(async () => {
    await prisma.$disconnect(); // Desconecta do Prisma após a execução bem-sucedida
    console.log("Seed executado com sucesso!"); // Log de sucesso
}).catch(async (error) => {
    await prisma.$disconnect(); // Desconecta do Prisma em caso de erro
    console.error(error); // Log de erro
});