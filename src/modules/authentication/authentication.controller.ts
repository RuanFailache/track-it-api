import { Body, ConflictException, Controller, Post, UnauthorizedException } from '@nestjs/common';

import { AccountService } from '../account/account.service';
import { SessionService } from '../session/session.service';

import { SignInDto } from './dtos/sign-in.dto';
import { SignUpDto } from './dtos/sign-up.dto';

@Controller('/auth')
export class AuthenticationController {
	constructor(
		private readonly accountService: AccountService,
		private readonly sessionService: SessionService,
	) {}

	@Post('/sign-in')
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
	async signUp(@Body() signUpDto: SignUpDto) {
		const account = await this.accountService.findByEmail(signUpDto.email);

		if (account !== undefined) throw new ConflictException();

		await this.accountService.create({
			email: signUpDto.email,
			fullName: signUpDto.fullName,
			password: signUpDto.password,
		});

		const credentials = await this.sessionService.create(account.id);

		return {
			accessToken: credentials.accessToken,
			refreshToken: credentials.refreshToken,
		};
	}
}
