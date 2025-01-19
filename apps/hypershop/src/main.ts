/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { hypercontract } from '@hypercontract/express';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as bodyParser from 'body-parser';
import { static as serveStatic } from 'express';
import { get, isUndefined, values } from 'lodash';
import methodOverride from 'method-override';
import { join } from 'path';
import { AppModule } from './app/app.module';
import { MediaType } from './app/formats/media-type';
import { profile } from './app/profile';
import { environment } from './environments/environment';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const port = process.env.port || environment.port;

    app.setBaseViewsDir(join(__dirname, 'app'));
    app.setViewEngine('ejs');

    app.enableCors({
        exposedHeaders: [
            'Location'
        ]
    })

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(bodyParser.json({ type: MediaType.JsonHal }));
    app.use(bodyParser.json({ type: MediaType.JsonLd }));

    app.use(methodOverride((request) => {
        const method = get(request, 'body._method');
        if (!isUndefined(method)) {
            delete request.body._method;
        }
        return method;
    }));

    app.use(hypercontract(profile, values(MediaType)));

    app.use('/assets', serveStatic(join(__dirname, 'assets')));

    await app.listen(port);

    Logger.log(
        `🚀 hypershop is running on: http://localhost:${port}`
    );
}

bootstrap();
