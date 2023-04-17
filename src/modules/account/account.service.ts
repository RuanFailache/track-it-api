import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { randomUUID } from 'crypto';

const accounts: UserEntity[] = [];

@Injectable()
export class AccountService {
	async create(params: Omit<UserEntity, 'id'>) {
		accounts.push(new UserEntity(randomUUID(), params.email, params.fullName, params.password));
	}

	async findByEmail(email: string): Promise<UserEntity> {
		return new UserEntity('id', email, 'nome', 'senha');
	}
}
