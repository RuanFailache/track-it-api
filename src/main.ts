import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from '@config/app/app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const config = new DocumentBuilder()
		.setTitle('Track It')
		.setDescription('The task tracker API')
		.setVersion('1.0.0')
		.build();

	const document = SwaggerModule.createDocument(app, config);

	SwaggerModule.setup('api', app, document);

	await app.listen(3000);
}
bootstrap();
