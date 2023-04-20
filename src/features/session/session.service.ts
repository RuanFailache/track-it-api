import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { SessionRepository } from './session.repository';

interface CreateSessionPayload {
	email: string;
	password: string;
}

@Injectable()
export class SessionService {
	constructor(
		private sessionRepository: SessionRepository,
		private jwtService: JwtService,
	) {}

	async create(userId: string, payload: CreateSessionPayload) {
		const accessToken = await this.jwtService.signAsync(payload);
		await this.sessionRepository.create(userId, accessToken);
		return accessToken;
	}
}
