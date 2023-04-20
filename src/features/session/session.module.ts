import { Module } from '@nestjs/common';

import { PrismaModule } from '@adapters/prisma/prisma.module';

import { SessionService } from './session.service';

@Module({
	exports: [SessionService],
	providers: [SessionService],
	imports: [PrismaModule],
})
export class SessionModule {}
