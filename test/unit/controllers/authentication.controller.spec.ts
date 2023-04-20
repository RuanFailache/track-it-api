import { Test } from '@nestjs/testing';

import { AuthenticationController } from '@features/authentication/authentication.controller';
import { SessionService } from '@features/session/session.service';
import { UserService } from '@features/user/user.service';
import { AuthenticationModule } from '@features/authentication/authentication.module';
import { faker } from '@faker-js/faker';

describe('AuthenticationController', () => {
	let authenticationController: AuthenticationController;

	let sessionService: SessionService;
	let userService: UserService;

	const userId = faker.datatype.uuid();
	const accessToken = faker.datatype.uuid();

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [AuthenticationModule],
		}).compile();

		userService = moduleRef.get(UserService);
		sessionService = moduleRef.get(SessionService);
		authenticationController = moduleRef.get(AuthenticationController);
	});

	describe('signIn', () => {
		const callAuthenticationControllerSignIn = () =>
			authenticationController.signIn({
				email: faker.internet.email(),
				password: faker.internet.password(),
			});

		beforeEach(() => {
			jest.spyOn(userService, 'validate').mockImplementation(() =>
				Promise.resolve(userId),
			);

			jest.spyOn(sessionService, 'create').mockImplementation(() =>
				Promise.resolve(accessToken),
			);
		});

		it('Should ensure UserController.signIn calls UserService.validate once', async () => {
			const userServiceFn = jest
				.spyOn(userService, 'validate')
				.mockImplementation(() => Promise.resolve(userId));

			await callAuthenticationControllerSignIn();

			expect(userServiceFn.mock.calls).toHaveLength(1);
		});

		it('Should ensure UserController.signIn calls SessionService.create once', async () => {
			const sessionServiceFn = jest
				.spyOn(sessionService, 'create')
				.mockImplementation(() => Promise.resolve(accessToken));

			await callAuthenticationControllerSignIn();

			expect(sessionServiceFn.mock.calls).toHaveLength(1);
		});

		it('Should ensure UserController.signIn returns correct values', async () => {
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
			jest.spyOn(userService, 'create').mockImplementation(() =>
				Promise.resolve(userId),
			);

			jest.spyOn(sessionService, 'create').mockImplementation(() =>
				Promise.resolve(accessToken),
			);
		});

		it('Should ensure UserController.signIn calls UserService.create once', async () => {
			const userServiceFn = jest
				.spyOn(userService, 'create')
				.mockImplementation(() => Promise.resolve(userId));

			await callAuthenticationControllerSignUp();

			expect(userServiceFn.mock.calls).toHaveLength(1);
		});

		it('Should ensure UserController.signIn calls SessionService.create once', async () => {
			const sessionServiceFn = jest
				.spyOn(sessionService, 'create')
				.mockImplementation(() => Promise.resolve(accessToken));

			await callAuthenticationControllerSignUp();

			expect(sessionServiceFn.mock.calls).toHaveLength(1);
		});

		it('Should ensure UserController.signUp returns correct values', async () => {
			const res = await callAuthenticationControllerSignUp();

			expect(res).toStrictEqual({ accessToken });
		});
	});
});
