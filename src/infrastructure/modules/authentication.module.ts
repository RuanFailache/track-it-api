import { Module } from '@nestjs/common';

import { SessionModule } from './session.module';
import { UserModule } from './user.module';

import { AuthenticationController } from '@presentation/controllers/authentication.controller';

@Module({
	imports: [UserModule, SessionModule],
	controllers: [AuthenticationController],
})
export class AuthenticationModule {}
