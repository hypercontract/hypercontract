import { hypercontract } from '@hypercontract/express';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import cors from 'cors';
import morgan from 'morgan';
import { AppModule } from './app/app.module';
import { vocabulary } from './app/vocabulary';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const port = process.env.port || 8080;

    app.use(morgan('combined'));
    app.use(cors({
        exposedHeaders: [
            'Location'
        ]
    }));

    app.use(hypercontract(vocabulary, []));

    await app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
}

bootstrap();
