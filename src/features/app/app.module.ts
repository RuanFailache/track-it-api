import { Module } from '@nestjs/common';
import { AuthenticationModule } from '@features/authentication/authentication.module';

@Module({
	imports: [AuthenticationModule],
})
export class AppModule {}
