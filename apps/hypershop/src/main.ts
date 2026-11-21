/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { createApp } from './app/app';
import { environment } from './environments/environment';

async function bootstrap() {
    const app = await createApp();
    const port = process.env.port || environment.port;

    app.listen(port, () => {
        console.log(`🚀 hypershop is running on: http://localhost:${port}`);
    });
}

void bootstrap().catch(error => {
    console.error(error);
    process.exitCode = 1;
});
