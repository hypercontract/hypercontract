/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { handleRequestError, handleUnknownRoute, hypercontract } from '@hypercontract/express';
import cors from 'cors';
import express from 'express';
import { vocabulary } from './app/vocabulary';
import { environment } from './environments/environment';


function bootstrap() {
    const app = express();
    const port = process.env.port || environment.port;

    app.use(cors({ exposedHeaders: ['Location'] }));

    app.use(hypercontract(vocabulary, []));
    app.use(handleUnknownRoute);
    app.use(handleRequestError);

    app.listen(port, () => {
        console.log(`🚀 hypercontract is running on: http://localhost:${port}`);
    });
}

bootstrap();
