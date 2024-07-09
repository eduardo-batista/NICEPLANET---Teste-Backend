#!/usr/bin/env bash
cd /app

# Gere os clientes Prisma
yarn prisma generate;

# Roda as migrations do Prisma
yarn prisma migrate dev --name init;

# Rode as seeds do Prisma
yarn prisma db seed;

# Inicie o servidor NestJS
yarn start:dev;
