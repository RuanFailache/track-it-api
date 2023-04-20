import * as Joi from 'joi';

export class SignUpDto {
	readonly email: string;
	readonly fullName: string;
	readonly password: string;
}

export const signUpDtoSchema = Joi.object<SignUpDto>({
	email: Joi.string().email().required(),
	fullName: Joi.string().required(),
	password: Joi.string().min(6).required(),
});
