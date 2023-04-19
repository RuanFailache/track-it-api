import * as mongoose from 'mongoose';

export const DATABASE_CONNECTION_PROVIDER = 'DATABASE_CONNECTION';

export const databaseProviders = [
	{
		provide: DATABASE_CONNECTION_PROVIDER,
		useFactory: (): Promise<typeof mongoose> => mongoose.connect(process.env.DATABASE_URL),
	},
];
