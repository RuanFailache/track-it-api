import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { randomUUID } from 'crypto';

const accounts: UserEntity[] = [];

@Injectable()
export class AccountService {
	async create(params: Omit<UserEntity, 'id'>) {
		const newAccount = new UserEntity(
			randomUUID(),
			params.email,
			params.fullName,
			params.password,
		);

		accounts.push(newAccount);

		return newAccount;
	}

	async findByEmail(email: string) {
		return accounts.find((account) => account.email === email);
	}

	async checkIfPasswordIsCorrect(password: string, accountPassword: string) {
		return password === accountPassword;
	}
}
