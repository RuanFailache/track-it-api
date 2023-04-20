import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { PrismaModule } from '@adapters/prisma/prisma.module';

import { SessionService } from './session.service';
import { SessionRepository } from './session.repository';

@Module({
	exports: [SessionService],
	providers: [SessionService, SessionRepository],
	imports: [
		PrismaModule,
		JwtModule.register({
			global: true,
			secret: process.env.JWT_SECRET,
		}),
	],
})
export class SessionModule {}
