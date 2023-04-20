import { Test } from '@nestjs/testing';

import { SessionModule } from '@features/session/session.module';
import { SessionService } from '@features/session/session.service';
import { SessionRepository } from '@features/session/session.repository';
import { JwtService } from '@nestjs/jwt';

describe('SessionService', () => {
	let jwtService: JwtService;
	let sessionService: SessionService;

	let sessionRepository: SessionRepository;

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [SessionModule],
		}).compile();

		jwtService = moduleRef.get(JwtService);
		sessionService = moduleRef.get(SessionService);
		sessionRepository = moduleRef.get(SessionRepository);
	});

	describe('create', () => {
		it('Should ensure UserController.signIn returns correct values', async () => {
			const accessToken = 'token';

			jest.spyOn(sessionRepository, 'create').mockImplementation(() =>
				Promise.resolve(),
			);

			jest.spyOn(jwtService, 'signAsync').mockImplementation(() =>
				Promise.resolve(accessToken),
			);

			const res = await sessionService.create('id', {
				email: 'valid@email.com',
				password: 'senha',
			});

			expect(res).toBe(accessToken);
		});
	});
});
