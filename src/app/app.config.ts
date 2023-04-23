import { ConfigModuleOptions } from '@nestjs/config';

const envFileOptions = {
	production: '.env',
	development: '.env.development',
	test: '.env.test',
};

export const appConfigOptions: ConfigModuleOptions = {
	envFilePath: envFileOptions[process.env.NODE_ENV],
};
