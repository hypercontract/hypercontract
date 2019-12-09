import { hypercontract } from '@hypercontract/express';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { profile } from './profile';

@Module({
    imports: [],
    controllers: []
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(hypercontract(profile))
            .forRoutes('profile(/*)?');
    }
}
