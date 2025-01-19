/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { hypercontract } from '@hypercontract/express';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { vocabulary } from './app/vocabulary';
import { environment } from './environments/environment';


async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const port = process.env.port || environment.port;

    app.enableCors({
        exposedHeaders: [
            'Location'
        ]
    })

    app.use(hypercontract(vocabulary, []));

    await app.listen(port);

    Logger.log(
        `🚀 hypercontract is running on: http://localhost:${port}`
    );
}

bootstrap();