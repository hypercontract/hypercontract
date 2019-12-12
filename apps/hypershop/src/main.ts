import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import { Request } from 'express';
import { get, isUndefined } from 'lodash';
import methodOverride from 'method-override';
import morgan from 'morgan';
import { join } from 'path';
import { AppModule } from './app/app.module';

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
    app.use(bodyParser.json({ type: 'application/hal+json' }));
    app.use(bodyParser.json({ type: 'application/ld+json' }));

    app.use(methodOverride((request: Request) => {
        const method = get(request, 'body._method');
        if (!isUndefined(method)) {
            delete request.body._method;
        }
        return method;
    }));

    await app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
}

bootstrap();
