import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { faker } from '@faker-js/faker';

import { SessionModule } from '@features/session/session.module';
import { SessionService } from '@features/session/session.service';
import { SessionRepository } from '@features/session/session.repository';

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
		const accessToken = faker.datatype.uuid();

		const callSessionServiceCreate = () =>
			sessionService.create('id', {
				email: faker.internet.email(),
				password: faker.internet.password(),
			});

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
				.spyOn(sessionRepository, 'create')
				.mockImplementation(() => Promise.resolve());

			await callSessionServiceCreate();

			expect(sessionRepositoryFn.mock.calls).toHaveLength(1);
		});

		it('Should ensure UserController.signIn calls JwtService.signAsync once', async () => {
			const jwtServiceFn = jest
				.spyOn(jwtService, 'signAsync')
				.mockImplementation(() => Promise.resolve(accessToken));

			await callSessionServiceCreate();

			expect(jwtServiceFn.mock.calls).toHaveLength(1);
		});

		it('Should ensure UserController.signIn returns correct values', async () => {
			const res = await callSessionServiceCreate();

			expect(res).toBe(accessToken);
		});
	});
});
