import { Entity } from '../store';
import { Address } from './addresses/address.model';
import { PaymentOption } from './payment-options/payment-option.model';

export interface UserProfile extends Entity {
    addresses: Address[];
    paymentOptions: PaymentOption[];
}
