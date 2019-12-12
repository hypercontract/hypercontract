import { Module } from '@nestjs/common';
import { HomepageController } from './homepage.controller';

@Module({
    controllers: [
        HomepageController
    ]
})
export class HomepageModule {}
