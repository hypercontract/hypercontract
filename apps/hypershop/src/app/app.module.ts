import { Module } from '@nestjs/common';
import { ProfileModule } from './profile';

@Module({
    imports: [
        ProfileModule
    ]
})
export class AppModule {    }
