import { Injectable } from '@nestjs/common';

import { PrismaService } from '@infrastructure/external/prisma/prisma.service';

@Injectable()
export class UserRepository {
	constructor(private readonly prismaService: PrismaService) {}

	async findByEmail(email: string) {
		return this.prismaService.user.findFirst({
			where: {
				email,
			},
		});
	}

	async create(email: string, fullName: string, password: string) {
		return this.prismaService.user.create({
			data: {
				email,
				fullName,
				password,
			},
		});
	}
}
