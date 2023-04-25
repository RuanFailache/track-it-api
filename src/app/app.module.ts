import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from '@external/prisma/prisma.module';

import { appConfigOptions } from './app.config';
import { appRoutes } from './app.routes';

@Module({
	imports: [
		...appRoutes,
		ConfigModule.forRoot(appConfigOptions),
		PrismaModule,
	],
	exports: [PrismaModule],
})
export class AppModule {}
