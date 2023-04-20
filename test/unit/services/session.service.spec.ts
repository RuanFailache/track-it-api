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
		const accessToken = 'token';

		beforeEach(() => {
			jest.spyOn(sessionRepository, 'create').mockImplementation(() =>
				Promise.resolve(),
			);

			jest.spyOn(jwtService, 'signAsync').mockImplementation(() =>
				Promise.resolve(accessToken),
			);
		});

		it('Should ensure UserController.signIn calls SessionRepository.create once', async () => {
			const sessionRepositoryFn = jest
				.spyOn(sessionService, 'create')
				.mockImplementation(() => Promise.resolve(accessToken));

			await sessionService.create('id', {
				email: 'valid@email.com',
				password: 'senha',
			});

			expect(sessionRepositoryFn.mock.calls).toHaveLength(1);
		});

		it('Should ensure UserController.signIn calls JwtService.signAsync once', async () => {
			const jwtServiceFn = jest
				.spyOn(jwtService, 'signAsync')
				.mockImplementation(() => Promise.resolve(accessToken));

			await sessionService.create('id', {
				email: 'valid@email.com',
				password: 'senha',
			});

			expect(jwtServiceFn.mock.calls).toHaveLength(1);
		});

		it('Should ensure UserController.signIn returns correct values', async () => {
			const res = await sessionService.create('id', {
				email: 'valid@email.com',
				password: 'senha',
			});

			expect(res).toBe(accessToken);
		});
	});
});
