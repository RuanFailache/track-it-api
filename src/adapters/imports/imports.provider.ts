import * as bcrypt from 'bcrypt';

import { ImportProvider } from './imports.constants';

export type BcryptType = typeof bcrypt;

export const importProviders = [
	{
		provide: ImportProvider.BCRYPT,
		useFactory: () => bcrypt,
	},
];
