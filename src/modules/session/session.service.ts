import { Injectable } from '@nestjs/common';
import { CredentialsEntity } from './entities/credentials.entity';

@Injectable()
export class SessionService {
	async create(accountId: string): Promise<CredentialsEntity> {
		return new CredentialsEntity('token', 'token');
	}
}
