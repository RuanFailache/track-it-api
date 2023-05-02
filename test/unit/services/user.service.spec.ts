import * as bcrypt from 'bcrypt';
import { Test } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { User } from '@prisma/client';
import { ConflictException, UnauthorizedException } from '@nestjs/common';

import { UserModule } from '@infrastructure/modules/user.module';
import { UserUseCase } from '@application/usecases/user.usecase';
import { UserRepository } from '@infrastructure/database/repositories/user.repository';

const fakeUser: User = {
	id: faker.datatype.uuid(),
	email: faker.internet.email(),
	fullName: faker.name.fullName(),
	password: faker.internet.password(),
	createdAt: new Date(),
	updatedAt: new Date(),
};

describe('UserUseCase', () => {
	let userCaUserUseCase: UserUseCase;
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

		userCaUserUseCase = moduleRef.get(UserUseCase);
		userRepository = moduleRef.get(UserRepository);
	});

	describe('create', () => {
		const callCreateUserUseCase = () => {
			return userCaUserUseCase.create(
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

		it('Should ensure UserUseCase.create calls UserRepository.findByEmail once', async () => {
			const spy = userRepositorySpy
				.findByEmail()
				.mockResolvedValue(undefined);

			await callCreateUserUseCase();

			expect(spy).toHaveBeenCalled();
		});

		it('Should ensure UserUseCase.create calls bcrypt.hashSync once', async () => {
			const spy = bcryptSpy.hash().mockReturnValue(faker.datatype.uuid());

			await callCreateUserUseCase();

			expect(spy).toHaveBeenCalled();
		});

		it('Should ensure UserUseCase.create calls UserRepository.create once', async () => {
			const spy = userRepositorySpy.create().mockResolvedValue(fakeUser);

			await callCreateUserUseCase();

			expect(spy).toHaveBeenCalled();
		});

		it('Should ensure UserUseCase.create throws ConflictException on email already registered', async () => {
			userRepositorySpy.findByEmail().mockResolvedValue(fakeUser);

			const act = callCreateUserUseCase();

			expect(act).rejects.toThrowError(new ConflictException());
		});

		it('Should ensure UserUseCase.create returns correct values on success', async () => {
			const act = await callCreateUserUseCase();

			expect(act).toBe(fakeUser.id);
		});
	});

	describe('validate', () => {
		const email = faker.internet.email();
		const password = faker.internet.password();

		const callValidateUserUseCase = () => {
			return userCaUserUseCase.validate(email, password);
		};

		beforeEach(() => {
			bcryptSpy.compare().mockReturnValue(true);
			userRepositorySpy.findByEmail().mockResolvedValue(fakeUser);
		});

		it('Should ensure UserUseCase.validate calls UserRepository.findByEmail once', async () => {
			const spy = userRepositorySpy
				.findByEmail()
				.mockResolvedValue(fakeUser);

			await callValidateUserUseCase();

			expect(spy).toHaveBeenCalled();
		});

		it('Should ensure UserUseCase.validate throws UnauthorizedException on email not registered', async () => {
			userRepositorySpy.findByEmail().mockResolvedValue(undefined);

			const act = callValidateUserUseCase();

			expect(act).rejects.toThrowError(new UnauthorizedException());
		});

		it('Should ensure UserUseCase.validate calls bcrypt.compareSync once', async () => {
			const spy = bcryptSpy.compare().mockReturnValue(true);

			await callValidateUserUseCase();

			expect(spy).toHaveBeenCalled();
		});

		it('Should ensure UserUseCase.validate throws UnauthorizedException on wrong password', async () => {
			bcryptSpy.compare().mockReturnValue(false);

			const act = callValidateUserUseCase();

			expect(act).rejects.toThrowError(new UnauthorizedException());
		});

		it('Should ensure UserUseCase.validate returns correct values on success', async () => {
			const act = await callValidateUserUseCase();

			expect(act).toBe(fakeUser.id);
		});
	});
});
