import { Module } from '@nestjs/common';

import { PrismaModule } from '@adapters/prisma/prisma.module';

import { UserService } from './user.service';
import { UserRepository } from './user.repository';

@Module({
	exports: [UserService],
	providers: [UserService, UserRepository],
	imports: [PrismaModule],
})
export class UserModule {}
