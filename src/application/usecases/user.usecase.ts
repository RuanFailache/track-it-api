import {
	Injectable,
	ConflictException,
	UnauthorizedException,
} from '@nestjs/common';

import { BcryptService } from '@infrastructure/external/bcrypt/bcrypt.service';
import { UserRepository } from '@infrastructure/database/repositories/user.repository';

@Injectable()
export class UserUseCase {
	constructor(
		private readonly bcryptService: BcryptService,
		private readonly userRepository: UserRepository,
	) {}

	async create(email: string, fullName: string, password: string) {
		const user = await this.userRepository.findByEmail(email);

		if (user) throw new ConflictException();

		const encodedPassword = this.bcryptService.encode(password);

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

		const isCorrectPassword = this.bcryptService.validate(
			password,
			user.password,
		);

		if (!isCorrectPassword) throw new UnauthorizedException();

		return user.id;
	}
}
