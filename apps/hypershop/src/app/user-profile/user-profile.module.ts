import { Module } from '@nestjs/common';
import addresses from '../../assets/addresses.mock.json';
import paymentOptions from '../../assets/payment-options.mock.json';
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
            useValue: createMockStore(addresses)
        },
        {
            provide: PAYMENT_OPTION_STORE,
            useValue: createMockStore(paymentOptions)
        }
    ],
    exports: [
        UserProfileService
    ]
})
export class UserProfileModule {}
