import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
	constructor(private schema: ObjectSchema) {}

	transform(value: unknown) {
		const validatioResult = this.schema.validate(value);
		if (validatioResult.error !== undefined) {
			throw new BadRequestException();
		}
		return value;
	}
}
