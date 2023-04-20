import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	UsePipes,
} from '@nestjs/common';

import { JoiValidationPipe } from '@adapters/joi/joi.pipe';

import { UserService } from '@features/user/user.service';
import { SessionService } from '@features/session/session.service';

import { SignInDto, signInDtoSchema } from './dtos/sign-in.dto';
import { SignUpDto, signUpDtoSchema } from './dtos/sign-up.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('/auth')
export class AuthenticationController {
	constructor(
		private readonly userService: UserService,
		private readonly sessionService: SessionService,
	) {}

	@Post('/sign-in')
	@ApiTags('authentication')
	@HttpCode(HttpStatus.CREATED)
	@UsePipes(new JoiValidationPipe(signInDtoSchema))
	async signIn(@Body() signInDto: SignInDto) {
		const userId = await this.userService.validate(
			signInDto.email,
			signInDto.password,
		);

		const accessToken = await this.sessionService.create(userId, {
			email: signInDto.email,
			password: signInDto.password,
		});

		return { accessToken };
	}

	@Post('/sign-up')
	@ApiTags('authentication')
	@UsePipes(new JoiValidationPipe(signUpDtoSchema))
	async signUp(@Body() signUpDto: SignUpDto) {
		const newUserId = await this.userService.create(
			signUpDto.email,
			signUpDto.fullName,
			signUpDto.password,
		);

		const accessToken = await this.sessionService.create(newUserId, {
			email: signUpDto.email,
			password: signUpDto.password,
		});

		return { accessToken };
	}
}
