import * as Joi from 'joi';

export class SignInDto {
	readonly email: string;
	readonly password: string;

	static get schema() {
		return Joi.object<SignInDto>({
			email: Joi.string().email().required(),
			password: Joi.string().required(),
		});
	}
}

export class SignUpDto {
	readonly email: string;
	readonly fullName: string;
	readonly password: string;

	static get schema() {
		return Joi.object<SignUpDto>({
			email: Joi.string().email().required(),
			fullName: Joi.string().required(),
			password: Joi.string().min(6).required(),
		});
	}
}
