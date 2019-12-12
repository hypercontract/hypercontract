import { hypercontract } from '@hypercontract/express';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { profile } from './profile';

@Module({})
export class ProfileModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(hypercontract(profile))
            .forRoutes('profile(/*)?');
    }
}
