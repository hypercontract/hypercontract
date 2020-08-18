import { Entity } from '../../store';

export interface BasePaymentOption {
    accountOwner: string;
    iban: string;
    bic: string;
}

export interface PaymentOption extends BasePaymentOption, Entity { }

export interface NewPaymentOption extends BasePaymentOption { }
export interface PaymentOptionUpdate extends BasePaymentOption { }
