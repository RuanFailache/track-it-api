import { Injectable } from '@nestjs/common';

import { PrismaProvider } from '@adapters/prisma/prisma.provider';

@Injectable()
export class SessionRepository {
	constructor(private prismaProvider: PrismaProvider) {}

	async create(userId: string, accessToken: string) {
		return this.prismaProvider.session.create({
			data: {
				userId,
				accessToken,
			},
		});
	}

	async findByUserId(userId: string) {
		return this.prismaProvider.session.findMany({
			where: {
				userId,
			},
		});
	}
}
