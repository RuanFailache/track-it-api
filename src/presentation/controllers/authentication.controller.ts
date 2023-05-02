import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	UsePipes,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserUseCase } from '@application/usecases/user.usecase';
import { SessionUseCase } from '@application/usecases/session.usecase';

import { JoiValidationPipe } from '@infrastructure/external/joi/joi.pipe';

import { SignInDto, SignUpDto } from '../dtos/authentication.dto';

@Controller('/api/auth')
export class AuthenticationController {
	constructor(
		private readonly userUseCase: UserUseCase,
		private readonly sessionUseCase: SessionUseCase,
	) {}

	@Post('/sign-in')
	@ApiTags('authentication')
	@HttpCode(HttpStatus.CREATED)
	@UsePipes(new JoiValidationPipe(SignInDto.schema))
	async signIn(@Body() signInDto: SignInDto) {
		const userId = await this.userUseCase.validate(
			signInDto.email,
			signInDto.password,
		);

		const accessToken = await this.sessionUseCase.create(userId, {
			email: signInDto.email,
			password: signInDto.password,
		});

		return { accessToken };
	}

	@Post('/sign-up')
	@ApiTags('authentication')
	@UsePipes(new JoiValidationPipe(SignUpDto.schema))
	async signUp(@Body() signUpDto: SignUpDto) {
		const newUserId = await this.userUseCase.create(
			signUpDto.email,
			signUpDto.fullName,
			signUpDto.password,
		);

		const accessToken = await this.sessionUseCase.create(newUserId, {
			email: signUpDto.email,
			password: signUpDto.password,
		});

		return { accessToken };
	}
}
