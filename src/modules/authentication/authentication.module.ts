import { Module } from '@nestjs/common';

import { SessionModule } from '../session/session.module';
import { AccountModule } from '../account/account.module';

import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';

@Module({
	imports: [AccountModule, SessionModule],
	controllers: [AuthenticationController],
	providers: [AuthenticationService],
})
export class AuthenticationModule {}
