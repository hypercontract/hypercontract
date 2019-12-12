import { Module } from '@nestjs/common';
import { ApiRootController } from './api-root.controller';

@Module({
    controllers: [
        ApiRootController
    ]
})
export class ApiRootModule {}
