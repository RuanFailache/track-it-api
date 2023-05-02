import { NestFactory } from '@nestjs/core';

import { AppModule } from '@infrastructure/modules/app.module';
import { swaggerConfig } from '@infrastructure/config/swagger.config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	swaggerConfig(app);
	await app.listen(process.env.PORT);
}

bootstrap();
