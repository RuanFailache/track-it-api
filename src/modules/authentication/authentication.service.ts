import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticationService {
	checkIfPasswordIsCorrect(password: string, accountPassword: string) {
		return password === accountPassword;
	}
}
