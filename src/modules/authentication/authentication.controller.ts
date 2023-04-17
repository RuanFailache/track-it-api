import { BadRequestException, Body, ConflictException, Controller, Post } from '@nestjs/common';

import { AccountService } from '../account/account.service';
import { SessionService } from '../session/session.service';

import { SignInDto } from './dtos/sign-in.dto';
import { SignUpDto } from './dtos/sign-up.dto';

import { AuthenticationService } from './authentication.service';

@Controller()
export class AuthenticationController {
	constructor(
		private readonly accountService: AccountService,
		private readonly authenticationService: AuthenticationService,
		private readonly sessionService: SessionService,
	) {}

	@Post()
	async signIn(@Body() signInDto: SignInDto) {
		const account = await this.accountService.findByEmail(signInDto.email);

		if (account === undefined) throw new BadRequestException();

		const isCorrectPassword = this.authenticationService.checkIfPasswordIsCorrect(
			signInDto.password,
			account.password,
		);

		if (!isCorrectPassword) throw new BadRequestException();

		const credentials = await this.sessionService.create(account.id);

		return {
			accessToken: credentials.accessToken,
			refreshToken: credentials.refreshToken,
		};
	}

	@Post()
	async signUp(@Body() signUpDto: SignUpDto) {
		const account = await this.accountService.findByEmail(signUpDto.email);

		if (account === undefined) throw new ConflictException();

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
