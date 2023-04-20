import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { appRoutes } from './app.routes';
import { appConfigOptions } from './app.config';

@Module({
	imports: [...appRoutes, ConfigModule.forRoot(appConfigOptions)],
})
export class AppModule {}
