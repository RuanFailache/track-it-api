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
		it('Should ensure UserController.signIn returns correct values', async () => {
			const userId = 'id';
			const accessToken = 'token';

			jest.spyOn(userService, 'validate').mockImplementation(() =>
				Promise.resolve(userId),
			);

			jest.spyOn(sessionService, 'create').mockImplementation(() =>
				Promise.resolve(accessToken),
			);

			const res = await authenticationController.signIn({
				email: 'valid@email.com',
				password: 'senha',
			});

			expect(res).toStrictEqual({ accessToken });
		});
	});
});
