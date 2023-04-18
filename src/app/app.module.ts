import { Module } from '@nestjs/common';
import { AuthenticationModule } from 'src/modules/authentication/authentication.module';

@Module({
	imports: [AuthenticationModule],
})
export class AppModule {}
