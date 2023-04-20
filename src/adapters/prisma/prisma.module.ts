import { Module } from '@nestjs/common';
import { PrismaProvider } from './prisma.provider';

@Module({
	exports: [PrismaProvider],
	providers: [PrismaProvider],
})
export class PrismaModule {}
