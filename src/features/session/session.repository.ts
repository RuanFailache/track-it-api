import { Injectable } from '@nestjs/common';

import { PrismaProvider } from 'src/external/prisma/prisma.provider';

@Injectable()
export class SessionRepository {
	constructor(private readonly prismaProvider: PrismaProvider) {}

	async create(userId: string, accessToken: string) {
		await this.prismaProvider.session.create({
			data: {
				userId,
				accessToken,
			},
		});
	}
}
