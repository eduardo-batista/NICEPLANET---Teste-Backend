import { Module } from '@nestjs/common';
import { ProductorService } from './productor.service';
import { PrismaService } from 'src/config/prisma.service';
import { ProductorController } from './productor.controller';

@Module({
  controllers: [ProductorController],
  providers: [ProductorService, PrismaService]
})
export class ProductorModule { }
