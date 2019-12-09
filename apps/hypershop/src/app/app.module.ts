import { hypercontract } from '@hypercontract/express';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { context } from './namespaces';
import { profile, profileGraph } from './profile';

@Module({
    imports: [],
    controllers: []
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(hypercontract(profileGraph, profile, context))
            .forRoutes('profile(/*)?');
    }
}
