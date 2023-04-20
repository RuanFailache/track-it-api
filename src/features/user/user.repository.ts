import { PrismaProvider } from '@adapters/prisma/prisma.provider';

export class UserRepository {
	constructor(private prismaProvider: PrismaProvider) {}

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
