import { hypercontract } from '@hypercontract/express';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import { Request, static as serveStatic } from 'express';
import { get, isUndefined, values } from 'lodash';
import methodOverride from 'method-override';
import morgan from 'morgan';
import { join } from 'path';
import { AppModule } from './app/app.module';
import { MediaType } from './app/formats/media-type';
import { profile } from './app/profile';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const port = process.env.port || 80;

    app.setBaseViewsDir(join(__dirname, 'app'));
    app.setViewEngine('ejs');

    app.use(morgan('combined'));
    app.use(cors({
        exposedHeaders: [
            'Location'
        ]
    }));
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(bodyParser.json({ type: MediaType.JsonHal }));
    app.use(bodyParser.json({ type: MediaType.JsonLd }));

    app.use(methodOverride((request: Request) => {
        const method = get(request, 'body._method');
        if (!isUndefined(method)) {
            delete request.body._method;
        }
        return method;
    }));

    app.use(hypercontract(profile, values(MediaType)));

    app.use('/assets', serveStatic(join(__dirname, 'assets')));

    await app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
}

bootstrap();
