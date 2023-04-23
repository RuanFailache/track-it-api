import { PrismaProvider } from '@adapters/prisma/prisma.provider';
import { Injectable } from '@nestjs/common';

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
