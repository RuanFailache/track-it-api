import { faker } from '@faker-js/faker';
import { HttpStatus } from '@nestjs/common';

import { TestServer, configureTestServer } from '../helpers/test-utils';

const email = faker.internet.email();
const fullName = faker.name.fullName();
const password = faker.internet.password();

describe('AuthenticationModule', () => {
	let server: TestServer;

	beforeAll(async () => {
		server = await configureTestServer();
	});

	describe('POST /api/auth/sign-up', () => {
		const apiPathRoute = '/api/auth/sign-up';

		it('Should ensure route returns HttpStatus.BAD_REQUEST on empty body', async () => {
			await server
				.post(apiPathRoute)
				.send({})
				.expect(HttpStatus.BAD_REQUEST);
		});

		it('Should ensure route returns HttpStatus.BAD_REQUEST on body without email', async () => {
			await server
				.post(apiPathRoute)
				.send({ fullName, password })
				.expect(HttpStatus.BAD_REQUEST);
		});

		it('Should ensure route returns HttpStatus.BAD_REQUEST on invalid email', async () => {
			await server
				.post(apiPathRoute)
				.send({ fullName, password, email: 'invalid_email' })
				.expect(HttpStatus.BAD_REQUEST);
		});

		it('Should ensure route returns HttpStatus.BAD_REQUEST on body without full name', async () => {
			await server
				.post(apiPathRoute)
				.send({ email, password })
				.expect(HttpStatus.BAD_REQUEST);
		});

		it('Should ensure route returns HttpStatus.BAD_REQUEST on invalid full name', async () => {
			await server
				.post(apiPathRoute)
				.send({ email, password, fullName: '' })
				.expect(HttpStatus.BAD_REQUEST);
		});

		it('Should ensure route returns HttpStatus.BAD_REQUEST on body without password', async () => {
			await server
				.post(apiPathRoute)
				.send({ email, fullName })
				.expect(HttpStatus.BAD_REQUEST);
		});

		it('Should ensure route returns HttpStatus.BAD_REQUEST on invalid password', async () => {
			await server
				.post(apiPathRoute)
				.send({ email, fullName, password: '' })
				.expect(HttpStatus.BAD_REQUEST);
		});

		it('Should ensure route returns HttpStatus.CREATED on successful request', async () => {
			await server
				.post(apiPathRoute)
				.send({ email, fullName, password })
				.expect(HttpStatus.CREATED);
		});

		it('Should ensure route returns HttpStatus.CONFLICT when email is already registered', async () => {
			await server
				.post(apiPathRoute)
				.send({ email, fullName, password })
				.expect(HttpStatus.CONFLICT);
		});
	});

	describe('POST /api/auth/sign-in', () => {
		const apiPathRoute = '/api/auth/sign-in';

		it('Should ensure route returns HttpStatus.BAD_REQUEST on empty body', async () => {
			await server
				.post(apiPathRoute)
				.send({})
				.expect(HttpStatus.BAD_REQUEST);
		});

		it('Should ensure route returns HttpStatus.BAD_REQUEST on body without email', async () => {
			await server
				.post(apiPathRoute)
				.send({ password })
				.expect(HttpStatus.BAD_REQUEST);
		});

		it('Should ensure route returns HttpStatus.BAD_REQUEST on invalid email', async () => {
			await server
				.post(apiPathRoute)
				.send({ password, email: 'invalid_email' })
				.expect(HttpStatus.BAD_REQUEST);
		});

		it('Should ensure route returns HttpStatus.BAD_REQUEST on body without password', async () => {
			await server
				.post(apiPathRoute)
				.send({ email })
				.expect(HttpStatus.BAD_REQUEST);
		});

		it('Should ensure route returns HttpStatus.BAD_REQUEST on invalid password', async () => {
			await server
				.post(apiPathRoute)
				.send({ email, password: '' })
				.expect(HttpStatus.BAD_REQUEST);
		});

		it('Should ensure route returns HttpStatus.UNAUTHORIZED when email is not registered', async () => {
			await server
				.post(apiPathRoute)
				.send({ password, email: faker.internet.email() })
				.expect(HttpStatus.UNAUTHORIZED);
		});

		it('Should ensure route returns HttpStatus.UNAUTHORIZED when password is incorrect', async () => {
			await server
				.post(apiPathRoute)
				.send({ email, password: faker.internet.password() })
				.expect(HttpStatus.UNAUTHORIZED);
		});

		it('Should ensure route returns HttpStatus.CREATED on successful request', async () => {
			await server
				.post(apiPathRoute)
				.send({ email, password })
				.expect(HttpStatus.CREATED);
		});
	});
});
