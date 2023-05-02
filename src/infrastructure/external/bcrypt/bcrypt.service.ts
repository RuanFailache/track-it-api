import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BcryptService {
	private saltOrRounds = 12;

	encode(value: string) {
		return bcrypt.hashSync(value, this.saltOrRounds);
	}

	validate(value: string, encodedValue: string) {
		return bcrypt.compareSync(value, encodedValue);
	}
}
