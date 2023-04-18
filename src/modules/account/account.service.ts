import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { randomUUID } from 'crypto';

const accounts: UserEntity[] = [];

@Injectable()
export class AccountService {
	async create(params: Omit<UserEntity, 'id'>) {
		accounts.push(new UserEntity(randomUUID(), params.email, params.fullName, params.password));
	}

	async findByEmail(email: string) {
		return accounts.find((account) => account.email === email);
	}

	async checkIfPasswordIsCorrect(password: string, accountPassword: string) {
		return password === accountPassword;
	}
}
