import { Schema } from '@hypercontract/profile';
import { flatten } from 'lodash';
import { MediaType } from '../media-types';
import { jsonSchemaFor } from './json-schema-builder';

const jsonMediaTypes = [
    MediaType.Json,
    MediaType.JsonHal,
    MediaType.JsonLd
];

export const jsonCommonSchemas: Schema[] = flatten(jsonMediaTypes.map(targetType => {
    const { array, date, decimal, empty, href, integer, objectWith, refSchema, string  } = jsonSchemaFor(targetType);

    return [
        string('accountOwner'),
        string('bic'),
        empty('billingAddress', refSchema('BillingAddress')),
        string('cancellationReason'),
        string('city'),
        string('country'),
        string('iban'),
        string('name'),
        date('orderDate'),
        array('orderItems', refSchema('OrderItem'), { minItems: 1 }),
        string('orderStatus', { enum: ['Processing', 'Delivered', 'Cancelled'] }),
        empty('payment', refSchema('Payment')),
        decimal('price', { multipleOf: 0.01, minimum: 0.01 }),
        string('productDescription'),
        string('productName'),
        integer('quantity', { minimum: 1 }),
        string('queryString'),
        empty('shippingAddress', refSchema('ShippingAddress')),
        array('shoppingCartItems', refSchema('ShoppingCartItem'), { minItems: 1 }),
        string('street'),
        decimal('totalPrice', { multipleOf: 0.01, minimum: 0.01 }),
        integer('totalResults', { minimum: 0 }),
        string('zipCode'),
        objectWith('AdditionToShoppingCart', ['product', 'quantity']),
        objectWith('BillingAddress', ['city', 'country', 'name', 'street', 'zipCode']),
        objectWith('NewOrder', ['billingAddress', 'payment', 'shippingAddress', 'shoppingCartItems']),
        objectWith('OrderCancellation', [], ['cancellationReason']),
        objectWith('OrderItem', ['price', 'productDescription', 'productName', 'quantity']),
        objectWith('Payment', ['accountOwner', 'bic', 'iban']),
        objectWith('QuantityChange', ['quantity']),
        objectWith('SearchQuery', ['queryString']),
        objectWith('ShippingAddress', ['city', 'country', 'name', 'street', 'zipCode']),
    ];
}));
