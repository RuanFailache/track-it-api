import {
	Injectable,
	ConflictException,
	UnauthorizedException,
} from '@nestjs/common';

import bcrypt from 'bcrypt';

import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
	constructor(private userRepository: UserRepository) {}

	async create(email: string, fullName: string, password: string) {
		const user = await this.userRepository.findByEmail(email);
		if (user !== undefined) throw new ConflictException();
		const encodedPassword = bcrypt.hashSync(password, 10);
		return this.userRepository.create(email, fullName, encodedPassword);
	}

	async validate(email: string, password: string) {
		const user = await this.userRepository.findByEmail(email);
		if (user === undefined) throw new UnauthorizedException();
		const isCorrectPassword = bcrypt.compareSync(password, user.password);
		if (!isCorrectPassword) throw new UnauthorizedException();
		return user;
	}
}
