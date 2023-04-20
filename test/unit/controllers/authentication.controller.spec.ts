import { Test } from '@nestjs/testing';

import { AuthenticationController } from '@features/authentication/authentication.controller';
import { SessionService } from '@features/session/session.service';
import { UserService } from '@features/user/user.service';
import { AuthenticationModule } from '@features/authentication/authentication.module';

describe('AuthenticationController', () => {
	let authenticationController: AuthenticationController;

	let sessionService: SessionService;
	let userService: UserService;

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [AuthenticationModule],
		}).compile();

		userService = moduleRef.get(UserService);
		sessionService = moduleRef.get(SessionService);
		authenticationController = moduleRef.get(AuthenticationController);
	});

	describe('signIn', () => {
		const userId = 'id';
		const accessToken = 'token';

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

			await authenticationController.signIn({
				email: 'valid@email.com',
				password: 'senha',
			});

			expect(userServiceFn.mock.calls).toHaveLength(1);
		});

		it('Should ensure UserController.signIn calls SessionService.create once', async () => {
			const sessionServiceFn = jest
				.spyOn(sessionService, 'create')
				.mockImplementation(() => Promise.resolve(accessToken));

			await authenticationController.signIn({
				email: 'valid@email.com',
				password: 'senha',
			});

			expect(sessionServiceFn.mock.calls).toHaveLength(1);
		});

		it('Should ensure UserController.signIn returns correct values', async () => {
			const res = await authenticationController.signIn({
				email: 'valid@email.com',
				password: 'senha',
			});

			expect(res).toStrictEqual({ accessToken });
		});
	});

	describe('signUp', () => {
		const userId = 'id';
		const accessToken = 'token';

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

			await authenticationController.signUp({
				fullName: 'Valid Name',
				email: 'valid@email.com',
				password: 'senha',
			});

			expect(userServiceFn.mock.calls).toHaveLength(1);
		});

		it('Should ensure UserController.signIn calls SessionService.create once', async () => {
			const sessionServiceFn = jest
				.spyOn(sessionService, 'create')
				.mockImplementation(() => Promise.resolve(accessToken));

			await authenticationController.signUp({
				fullName: 'Valid Name',
				email: 'valid@email.com',
				password: 'senha',
			});

			expect(sessionServiceFn.mock.calls).toHaveLength(1);
		});

		it('Should ensure UserController.signUp returns correct values', async () => {
			const res = await authenticationController.signUp({
				fullName: 'Valid Name',
				email: 'valid@email.com',
				password: 'senha',
			});

			expect(res).toStrictEqual({ accessToken });
		});
	});
});
