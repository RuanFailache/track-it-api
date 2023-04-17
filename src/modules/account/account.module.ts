import { Module } from '@nestjs/common';
import { AccountService } from './account.service';

@Module({
	exports: [AccountService],
})
export class AccountModule {}
