import * as Joi from 'joi';

export class SignInDto {
	readonly email: string;
	readonly password: string;
}

export const signInSchema = Joi.object<SignInDto>({
	email: Joi.string().email().required(),
	password: Joi.string().min(6).required(),
});
