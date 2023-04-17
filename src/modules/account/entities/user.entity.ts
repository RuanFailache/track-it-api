export class UserEntity {
	constructor(
		public id: string,
		public email: string,
		public fullName: string,
		public password: string,
	) {}
}
