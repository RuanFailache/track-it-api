import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { SessionRepository } from '@infrastructure/database/repositories/session.repository';

interface CreateSessionPayload {
	email: string;
	password: string;
}

@Injectable()
export class SessionUseCase {
	constructor(
		private readonly sessionRepository: SessionRepository,
		private readonly jwtService: JwtService,
	) {}

	async create(userId: string, payload: CreateSessionPayload) {
		const accessToken = await this.jwtService.signAsync(payload);
		await this.sessionRepository.create(userId, accessToken);
		return accessToken;
	}
}
