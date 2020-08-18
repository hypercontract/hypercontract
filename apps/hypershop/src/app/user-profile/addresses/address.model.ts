import { Entity } from '../../store';

interface BaseAddress {
    name: string;
    street: string;
    zipCode: string;
    city: string;
    country: string;
}

export interface Address extends BaseAddress, Entity { }

export interface NewAddress extends BaseAddress { }
export interface AddressUpdate extends BaseAddress { }
