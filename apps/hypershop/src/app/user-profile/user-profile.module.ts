import { Module } from '@nestjs/common';
import { addressMocks } from '../../test/addresses.mock';
import { paymentOptionMocks } from '../../test/payment-options.mock';
import { createMockStore } from '../store';
import { UserProfileController } from './user-profile.controller';
import { Address, PaymentOption } from './user-profile.model';
import { ADDRESSES, ADDRESS_STORE, PAYMENT_OPTIONS, PAYMENT_OPTION_STORE, UserProfileService } from './user-profile.service';

@Module({
    controllers: [
        UserProfileController
    ],
    providers: [
        UserProfileService,
        {
            provide: ADDRESSES,
            useValue: addressMocks
        },
        {
            provide: ADDRESS_STORE,
            useFactory: (addresses: Address[]) => createMockStore(addresses),
            inject: [ADDRESSES]
        },
        {
            provide: PAYMENT_OPTIONS,
            useValue: paymentOptionMocks
        },
        {
            provide: PAYMENT_OPTION_STORE,
            useFactory: (paymentOptions: PaymentOption[]) => createMockStore(paymentOptions),
            inject: [PAYMENT_OPTIONS]
        }
    ],
    exports: [
        UserProfileService
    ]
})
export class UserProfileModule {}
