import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { appConfigOptions } from './app.config';
import { PrismaModule } from 'src/external/prisma/prisma.module';
import { AuthenticationModule } from '@features/authentication/authentication.module';

@Module({
	imports: [
		ConfigModule.forRoot(appConfigOptions),
		PrismaModule,
		AuthenticationModule,
	],
	exports: [PrismaModule],
})
export class AppModule {}
