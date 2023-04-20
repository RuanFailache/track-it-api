import { Module } from '@nestjs/common';

import { SessionModule } from '../session/session.module';
import { UserModule } from '../user/user.module';

import { AuthenticationController } from './authentication.controller';

@Module({
	imports: [UserModule, SessionModule],
	controllers: [AuthenticationController],
})
export class AuthenticationModule {}
