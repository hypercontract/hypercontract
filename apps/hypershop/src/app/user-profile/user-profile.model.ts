import { Entity } from '../store';

export interface UserProfile extends Entity {
    addresses: Address[];
    paymentOptions: PaymentOption[];
}

export interface Address extends Entity {
    name: string;
    street: string;
    zipCode: string;
    city: string;
    country: string;
}

export interface PaymentOption extends Entity {
    accountOwner: string;
    iban: string;
    bic: string;
}
