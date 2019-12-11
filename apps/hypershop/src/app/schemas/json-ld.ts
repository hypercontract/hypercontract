import { Schema } from '@hypercontract/profile';
import { MediaType } from '../media-types';
import { jsonSchemaFor } from './json-schema-builder';

const { string, date, decimal, empty, integer } = jsonSchemaFor(MediaType.JsonLd);

export const jsonLdSchemas: Schema[] = [
    string('accountOwner'),
    string('bic'),
    /* TODO */ empty('billingAddress', {}), // billingAddress: jsonSchema BillingAddress
    string('cancellationReason'),
    string('city'),
    string('country'),
    string('iban'),
    string('name'),
    date('orderDate'),
    /* TODO */ empty('orderItem', {}), // orderItem: jsonSchema OrderItem OneOrMore
    string('orderStatus', { enum: ['Processing', 'Delivered', 'Cancelled'] }),
    /* TODO */ empty('payment', {}), // payment: jsonSchema Payment,
    decimal('price', { multipleOf: 0.01, minimum: 0.01 }),
    string('productDescription'),
    string('productName'),
    integer('quantity', { minimum: 1 }),
    string('queryString'),
    /* TODO */ empty('shoppingCartItems', {}), // shoppingCartItems: jsonSchema ShoppingCartItem OneOrMore
    /* TODO */ empty('shippingAddress', {}), // shippingAddress: jsonSchema ShippingAddress
    string('street'),
    decimal('totalPrice', { multipleOf: 0.01, minimum: 0.01 }),
    integer('totalResults', { minimum: 0 }),
    string('zipCode')
];
