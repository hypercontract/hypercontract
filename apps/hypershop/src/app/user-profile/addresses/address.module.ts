import { Module } from '@nestjs/common';
import { addressMocks } from '../../../test';
import { createMockStore } from '../../store';
import { AddressController } from './address.controller';
import { AddressService, ADDRESS_STORE } from './address.service';

@Module({
    controllers: [
        AddressController
    ],
    providers: [
        AddressService,
        {
            provide: ADDRESS_STORE,
            useValue: createMockStore(addressMocks)
        }
    ],
    exports: [
        AddressService
    ]
})
export class AddressModule { }
