import { Module } from '@nestjs/common';

import { importProviders } from './imports.provider';

@Module({
	exports: [...importProviders],
	providers: [...importProviders],
})
export class ImportModule {}
