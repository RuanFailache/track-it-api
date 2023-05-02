import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { faker } from '@faker-js/faker';

import { SessionUseCase } from '@application/usecases/session.usecase';

import { SessionModule } from '@infrastructure/modules/session.module';
import { SessionRepository } from '@infrastructure/database/repositories/session.repository';

describe('SessionUseCase', () => {
	let jwtService: JwtService;
	let sessionUseCase: SessionUseCase;

	let sessionRepository: SessionRepository;

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [SessionModule],
		}).compile();

		jwtService = moduleRef.get(JwtService);
		sessionUseCase = moduleRef.get(SessionUseCase);
		sessionRepository = moduleRef.get(SessionRepository);
	});

	describe('create', () => {
		const accessToken = faker.datatype.uuid();

		const callSessionUseCaseCreate = () =>
			sessionUseCase.create(faker.datatype.uuid(), {
				email: faker.internet.email(),
				password: faker.internet.password(),
			});

		beforeEach(() => {
			jest.spyOn(sessionRepository, 'create').mockResolvedValue();

			jest.spyOn(jwtService, 'signAsync').mockResolvedValue(accessToken);
		});

		it('Should ensure UserController.signIn calls SessionRepository.create once', async () => {
			const sessionRepositoryFn = jest
				.spyOn(sessionRepository, 'create')
				.mockResolvedValue();

			await callSessionUseCaseCreate();

			expect(sessionRepositoryFn.mock.calls).toHaveLength(1);
		});

		it('Should ensure UserController.signIn calls JwtService.signAsync once', async () => {
			const jwtServiceFn = jest
				.spyOn(jwtService, 'signAsync')
				.mockResolvedValue(accessToken);

			await callSessionUseCaseCreate();

			expect(jwtServiceFn.mock.calls).toHaveLength(1);
		});

		it('Should ensure UserController.signIn returns correct values on success', async () => {
			const res = await callSessionUseCaseCreate();

			expect(res).toBe(accessToken);
		});
	});
});
