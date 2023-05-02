import { Injectable } from '@nestjs/common';

import { PrismaService } from '@infrastructure/external/prisma/prisma.service';

@Injectable()
export class SessionRepository {
	constructor(private readonly prismaService: PrismaService) {}

	async create(userId: string, accessToken: string) {
		await this.prismaService.session.create({
			data: {
				userId,
				accessToken,
			},
		});
	}
}
