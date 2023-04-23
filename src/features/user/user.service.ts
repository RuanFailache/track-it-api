import {
	Injectable,
	ConflictException,
	UnauthorizedException,
	Inject,
} from '@nestjs/common';

import { BcryptType } from '@adapters/imports/imports.provider';

import { UserRepository } from './user.repository';
import { ImportProvider } from '@adapters/imports/imports.constants';

@Injectable()
export class UserService {
	constructor(
		@Inject(ImportProvider.BCRYPT)
		private readonly bcrypt: BcryptType,
		private readonly userRepository: UserRepository,
	) {}

	async create(email: string, fullName: string, password: string) {
		const user = await this.userRepository.findByEmail(email);

		if (user) throw new ConflictException();

		const encodedPassword = this.bcrypt.hashSync(password, 10);

		const newUser = await this.userRepository.create(
			email,
			fullName,
			encodedPassword,
		);

		return newUser.id;
	}

	async validate(email: string, password: string) {
		const user = await this.userRepository.findByEmail(email);

		if (!user) throw new UnauthorizedException();

		const isCorrectPassword = this.bcrypt.compareSync(
			password,
			user.password,
		);

		if (!isCorrectPassword) throw new UnauthorizedException();

		return user.id;
	}
}
