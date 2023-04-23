import { Injectable } from '@nestjs/common';

import { PrismaProvider } from '@adapters/prisma/prisma.provider';

@Injectable()
export class SessionRepository {
	constructor(private readonly prismaProvider: PrismaProvider) {}

	private async findByUserId(userId: string) {
		return this.prismaProvider.session.findFirst({
			where: {
				userId,
			},
		});
	}

	private async delete(sessionId: string) {
		await this.prismaProvider.session.delete({
			where: {
				id: sessionId,
			},
		});
	}

	async create(userId: string, accessToken: string) {
		await this.prismaProvider.session.create({
			data: {
				userId,
				accessToken,
			},
		});
	}
}
