import * as bcrypt from 'bcrypt';
import { Test } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { User } from '@prisma/client';
import { ConflictException, UnauthorizedException } from '@nestjs/common';

import { UserModule } from '@features/user/user.module';
import { UserService } from '@features/user/user.service';
import { UserRepository } from '@features/user/user.repository';

const fakeUser: User = {
	id: faker.datatype.uuid(),
	email: faker.internet.email(),
	fullName: faker.name.fullName(),
	password: faker.internet.password(),
	sessionId: faker.datatype.uuid(),
	createdAt: new Date(),
	updatedAt: new Date(),
};

describe('UserService', () => {
	let userService: UserService;
	let userRepository: UserRepository;

	const userRepositorySpy = {
		create: () => jest.spyOn(userRepository, 'create'),
		findByEmail: () => jest.spyOn(userRepository, 'findByEmail'),
	};

	const bcryptSpy = {
		hash: () => jest.spyOn(bcrypt, 'hashSync'),
		compare: () => jest.spyOn(bcrypt, 'compareSync'),
	};

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [UserModule],
		}).compile();

		userService = moduleRef.get(UserService);
		userRepository = moduleRef.get(UserRepository);
	});

	describe('create', () => {
		const callCreateUserService = () => {
			return userService.create(
				faker.internet.email(),
				faker.name.fullName(),
				faker.internet.password(),
			);
		};

		beforeEach(() => {
			bcryptSpy.hash().mockReturnValue(faker.datatype.uuid());
			userRepositorySpy.create().mockResolvedValue(fakeUser);
			userRepositorySpy.findByEmail().mockResolvedValue(undefined);
		});

		it('Should ensure UserService.create calls UserRepository.findByEmail once', async () => {
			const spy = userRepositorySpy
				.findByEmail()
				.mockResolvedValue(undefined);

			await callCreateUserService();

			expect(spy).toHaveBeenCalled();
		});

		it('Should ensure UserService.create calls bcrypt.hashSync once', async () => {
			const spy = bcryptSpy.hash().mockReturnValue(faker.datatype.uuid());

			await callCreateUserService();

			expect(spy).toHaveBeenCalled();
		});

		it('Should ensure UserService.create calls UserRepository.create once', async () => {
			const spy = userRepositorySpy.create().mockResolvedValue(fakeUser);

			await callCreateUserService();

			expect(spy).toHaveBeenCalled();
		});

		it('Should ensure UserService.create throws ConflictException on email already registered', async () => {
			userRepositorySpy.findByEmail().mockResolvedValue(fakeUser);

			const act = callCreateUserService();

			expect(act).rejects.toThrowError(new ConflictException());
		});

		it('Should ensure UserService.create returns correct values on success', async () => {
			const act = await callCreateUserService();

			expect(act).toBe(fakeUser.id);
		});
	});

	describe('validate', () => {
		const email = faker.internet.email();
		const password = faker.internet.password();

		const callValidateUserService = () => {
			return userService.validate(email, password);
		};

		beforeEach(() => {
			bcryptSpy.compare().mockReturnValue(true);
			userRepositorySpy.findByEmail().mockResolvedValue(fakeUser);
		});

		it('Should ensure UserService.validate calls UserRepository.findByEmail once', async () => {
			const spy = userRepositorySpy
				.findByEmail()
				.mockResolvedValue(fakeUser);

			await callValidateUserService();

			expect(spy).toHaveBeenCalled();
		});

		it('Should ensure UserService.validate throws UnauthorizedException on email not registered', async () => {
			userRepositorySpy.findByEmail().mockResolvedValue(undefined);

			const act = callValidateUserService();

			expect(act).rejects.toThrowError(new UnauthorizedException());
		});

		it('Should ensure UserService.validate calls bcrypt.compareSync once', async () => {
			const spy = bcryptSpy.compare().mockReturnValue(true);

			await callValidateUserService();

			expect(spy).toHaveBeenCalled();
		});

		it('Should ensure UserService.validate throws UnauthorizedException on wrong password', async () => {
			bcryptSpy.compare().mockReturnValue(false);

			const act = callValidateUserService();

			expect(act).rejects.toThrowError(new UnauthorizedException());
		});

		it('Should ensure UserService.validate returns correct values on success', async () => {
			const act = await callValidateUserService();

			expect(act).toBe(fakeUser.id);
		});
	});
});
