import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { SessionUseCase } from '@application/usecases/session.usecase';

import { PrismaModule } from '../external/prisma/prisma.module';
import { SessionRepository } from '../database/repositories/session.repository';

@Module({
	exports: [SessionUseCase],
	providers: [SessionUseCase, SessionRepository],
	imports: [
		PrismaModule,
		JwtModule.register({
			global: true,
			secret: process.env.JWT_SECRET,
		}),
	],
})
export class SessionModule {}
