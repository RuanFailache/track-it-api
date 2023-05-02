import { AppModule } from '@infrastructure/modules/app.module';
import { ModuleMetadata } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as supertest from 'supertest';

export type TestServer = supertest.SuperTest<supertest.Test>;

export async function configureTestServer(): Promise<TestServer> {
	const metadata: ModuleMetadata = { imports: [AppModule] };
	const moduleRef = await Test.createTestingModule(metadata).compile();
	const app = await moduleRef.createNestApplication().init();
	const httpServer = app.getHttpServer();
	return supertest(httpServer);
}
