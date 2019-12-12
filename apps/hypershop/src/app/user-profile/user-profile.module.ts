import { Module } from '@nestjs/common';
import { addressMocks, paymentOptionMocks } from '../../test';
import { createMockStore } from '../store';
import { UserProfileController } from './user-profile.controller';
import { ADDRESS_STORE, PAYMENT_OPTION_STORE, UserProfileService } from './user-profile.service';

@Module({
    controllers: [
        UserProfileController
    ],
    providers: [
        UserProfileService,
        {
            provide: ADDRESS_STORE,
            useValue: createMockStore(addressMocks)
        },
        {
            provide: PAYMENT_OPTION_STORE,
            useValue: createMockStore(paymentOptionMocks)
        }
    ],
    exports: [
        UserProfileService
    ]
})
export class UserProfileModule {}
