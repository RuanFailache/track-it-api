import { Module } from '@nestjs/common';

import { ImportModule } from '@external/imports/imports.module';
import { PrismaModule } from '@external/prisma/prisma.module';

import { UserService } from './user.service';
import { UserRepository } from './user.repository';

@Module({
	exports: [UserService],
	providers: [UserService, UserRepository],
	imports: [ImportModule, PrismaModule],
})
export class UserModule {}
