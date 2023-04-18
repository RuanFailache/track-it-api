import { Module } from '@nestjs/common';

import { SessionModule } from '../session/session.module';
import { AccountModule } from '../account/account.module';

import { AuthenticationController } from './authentication.controller';

@Module({
	imports: [AccountModule, SessionModule],
	controllers: [AuthenticationController],
})
export class AuthenticationModule {}
