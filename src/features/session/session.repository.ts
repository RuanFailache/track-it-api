import { Injectable } from '@nestjs/common';

import { PrismaProvider } from '@adapters/prisma/prisma.provider';

@Injectable()
export class SessionRepository {
	constructor(private prismaProvider: PrismaProvider) {}

	create(userId: string) {
		this.prismaProvider.session.create({
			data: {
				userId,
				accessToken: '',
			},
		});
	}
}
