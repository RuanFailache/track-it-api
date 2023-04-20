import {
	ConflictException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
	constructor(private userRepository: UserRepository) {}

	async create(email: string, fullName: string, password: string) {
		const user = await this.userRepository.findByEmail(email);
		if (user !== undefined) throw new ConflictException();
		// TODO: Encode password
		return this.userRepository.create(email, fullName, password);
	}

	async validate(email: string, password: string) {
		const user = await this.userRepository.findByEmail(email);
		if (user === undefined) throw new UnauthorizedException();
		// TODO: Decode password
		const isCorrectPassword = password === user.password;
		if (!isCorrectPassword) throw new UnauthorizedException();
		return user;
	}
}
