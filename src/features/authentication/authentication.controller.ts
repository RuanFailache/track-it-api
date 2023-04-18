import {
	Body,
	ConflictException,
	Controller,
	Post,
	UnauthorizedException,
	UsePipes,
} from '@nestjs/common';

import { JoiValidationPipe } from '@core/pipes/joi.pipe';

import { AccountService } from '@features/account/account.service';
import { SessionService } from '@features/session/session.service';

import { SignInDto, signInDtoValidation } from './dtos/sign-in.dto';
import { SignUpDto, signUpDtoValidation } from './dtos/sign-up.dto';

@Controller('/auth')
export class AuthenticationController {
	constructor(
		private readonly accountService: AccountService,
		private readonly sessionService: SessionService,
	) {}

	@Post('/sign-in')
	@UsePipes(new JoiValidationPipe(signInDtoValidation))
	async signIn(@Body() signInDto: SignInDto) {
		const account = await this.accountService.findByEmail(signInDto.email);

		if (account === undefined) throw new UnauthorizedException();

		const isCorrectPassword = this.accountService.checkIfPasswordIsCorrect(
			signInDto.password,
			account.password,
		);

		if (!isCorrectPassword) throw new UnauthorizedException();

		const credentials = await this.sessionService.create(account.id);

		return {
			accessToken: credentials.accessToken,
			refreshToken: credentials.refreshToken,
		};
	}

	@Post('/sign-up')
	@UsePipes(new JoiValidationPipe(signUpDtoValidation))
	async signUp(@Body() signUpDto: SignUpDto) {
		const account = await this.accountService.findByEmail(signUpDto.email);

		if (account !== undefined) throw new ConflictException();

		const newAccount = await this.accountService.create({
			email: signUpDto.email,
			fullName: signUpDto.fullName,
			password: signUpDto.password,
		});

		const credentials = await this.sessionService.create(newAccount.id);

		return {
			accessToken: credentials.accessToken,
			refreshToken: credentials.refreshToken,
		};
	}
}
