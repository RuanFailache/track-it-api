import { Module } from '@nestjs/common';

import { UserUseCase } from '@application/usecases/user.usecase';

import { BcryptModule } from '../external/bcrypt/bcrypt.module';
import { PrismaModule } from '../external/prisma/prisma.module';

import { UserRepository } from '../database/repositories/user.repository';

@Module({
	exports: [UserUseCase],
	providers: [UserUseCase, UserRepository],
	imports: [BcryptModule, PrismaModule],
})
export class UserModule {}
