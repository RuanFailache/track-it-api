import { Module } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';

import { PrismaModule } from '@infrastructure/external/prisma/prisma.module';

import { AuthenticationModule } from './authentication.module';

const envFileOptions = {
	production: '.env',
	development: '.env.development',
	test: '.env.test',
};

const appConfigOptions: ConfigModuleOptions = {
	envFilePath: envFileOptions[process.env.NODE_ENV],
};

@Module({
	imports: [
		ConfigModule.forRoot(appConfigOptions),
		PrismaModule,
		AuthenticationModule,
	],
	exports: [PrismaModule],
})
export class AppModule {}
