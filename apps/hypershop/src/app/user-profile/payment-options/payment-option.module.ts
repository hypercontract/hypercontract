import { Module } from '@nestjs/common';
import { paymentOptionMocks } from '../../../test';
import { createMockStore } from '../../store';
import { PaymentOptionController } from './payment-option.controller';
import { PaymentOptionService, PAYMENT_OPTION_STORE } from './payment-option.service';

@Module({
    controllers: [
        PaymentOptionController
    ],
    providers: [
        PaymentOptionService,
        {
            provide: PAYMENT_OPTION_STORE,
            useValue: createMockStore(paymentOptionMocks)
        }
    ],
    exports: [
        PaymentOptionService
    ]
})
export class PaymentOptionModule { }
