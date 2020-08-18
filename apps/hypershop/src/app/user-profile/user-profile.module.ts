import { Module } from '@nestjs/common';
import { AddressModule } from './addresses/address.module';
import { PaymentOptionModule } from './payment-options/payment-option.module';
import { UserProfileController } from './user-profile.controller';
import { UserProfileService } from './user-profile.service';

@Module({
    imports: [
        AddressModule,
        PaymentOptionModule
    ],
    controllers: [
        UserProfileController
    ],
    providers: [
        UserProfileService
    ],
    exports: [
        UserProfileService
    ]
})
export class UserProfileModule { }
