import { Injectable } from '@nestjs/common';

import { PrismaProvider } from '@external/prisma/prisma.provider';

@Injectable()
export class UserRepository {
	constructor(private readonly prismaProvider: PrismaProvider) {}

	async findByEmail(email: string) {
		return this.prismaProvider.user.findFirst({
			where: {
				email,
			},
		});
	}

	async create(email: string, fullName: string, password: string) {
		return this.prismaProvider.user.create({
			data: {
				email,
				fullName,
				password,
			},
		});
	}
}
