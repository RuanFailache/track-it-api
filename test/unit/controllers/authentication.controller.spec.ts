import { faker } from '@faker-js/faker';
import { Test } from '@nestjs/testing';

import { AuthenticationController } from '@presentation/controllers/authentication.controller';

import { UserUseCase } from '@application/usecases/user.usecase';
import { SessionUseCase } from '@application/usecases/session.usecase';

import { AuthenticationModule } from '@infrastructure/modules/authentication.module';

describe('AuthenticationController', () => {
	let authenticationController: AuthenticationController;

	let sessionUseCase: SessionUseCase;
	let userUseCase: UserUseCase;

	const userId = faker.datatype.uuid();
	const accessToken = faker.datatype.uuid();

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [AuthenticationModule],
		}).compile();

		userUseCase = moduleRef.get(UserUseCase);
		sessionUseCase = moduleRef.get(SessionUseCase);
		authenticationController = moduleRef.get(AuthenticationController);
	});

	describe('signIn', () => {
		const callAuthenticationControllerSignIn = () =>
			authenticationController.signIn({
				email: faker.internet.email(),
				password: faker.internet.password(),
			});

		beforeEach(() => {
			jest.spyOn(userUseCase, 'validate').mockResolvedValue(userId);

			jest.spyOn(sessionUseCase, 'create').mockResolvedValue(accessToken);
		});

		it('Should ensure UserController.signIn calls UserUseCase.validate once', async () => {
			const userUseCaseFn = jest
				.spyOn(userUseCase, 'validate')
				.mockResolvedValue(userId);

			await callAuthenticationControllerSignIn();

			expect(userUseCaseFn.mock.calls).toHaveLength(1);
		});

		it('Should ensure UserController.signIn calls SessionUseCase.create once', async () => {
			const sessionUseCaseFn = jest
				.spyOn(sessionUseCase, 'create')
				.mockResolvedValue(accessToken);

			await callAuthenticationControllerSignIn();

			expect(sessionUseCaseFn.mock.calls).toHaveLength(1);
		});

		it('Should ensure UserController.signIn returns correct values on success', async () => {
			const res = await callAuthenticationControllerSignIn();

			expect(res).toStrictEqual({ accessToken });
		});
	});

	describe('signUp', () => {
		const callAuthenticationControllerSignUp = () =>
			authenticationController.signUp({
				email: faker.internet.email(),
				fullName: faker.name.fullName(),
				password: faker.internet.password(),
			});

		beforeEach(() => {
			jest.spyOn(userUseCase, 'create').mockResolvedValue(userId);

			jest.spyOn(sessionUseCase, 'create').mockResolvedValue(accessToken);
		});

		it('Should ensure UserController.signIn calls UserUseCase.create once', async () => {
			const userUseCaseFn = jest
				.spyOn(userUseCase, 'create')
				.mockResolvedValue(userId);

			await callAuthenticationControllerSignUp();

			expect(userUseCaseFn.mock.calls).toHaveLength(1);
		});

		it('Should ensure UserController.signIn calls SessionUseCase.create once', async () => {
			const sessionUseCaseFn = jest
				.spyOn(sessionUseCase, 'create')
				.mockResolvedValue(accessToken);

			await callAuthenticationControllerSignUp();

			expect(sessionUseCaseFn.mock.calls).toHaveLength(1);
		});

		it('Should ensure UserController.signUp returns correct values on success', async () => {
			const res = await callAuthenticationControllerSignUp();

			expect(res).toStrictEqual({ accessToken });
		});
	});
});
