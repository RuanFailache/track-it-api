import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swaggerConfig = (app: INestApplication) => {
	if (process.env.NODE_ENV === 'development') {
		const config = new DocumentBuilder()
			.setTitle('Track It')
			.setDescription('The task tracker API')
			.setVersion('1.0.0')
			.build();

		const document = SwaggerModule.createDocument(app, config);

		SwaggerModule.setup('api', app, document);
	}
};
