import { ConfigModuleOptions } from '@nestjs/config';

export const appConfigOptions: ConfigModuleOptions = {
	envFilePath: ['.env', '.env.development', '.env.test'],
};
