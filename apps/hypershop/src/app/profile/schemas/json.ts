import { Schema } from '@hypercontract/profile';
import { MediaType } from '../media-types';
import { jsonSchemaFor } from './json-schema-builder';

const { array, href, object, objectWith, refSchema, string } = jsonSchemaFor(MediaType.Json);

export const jsonSchemas: Schema[] = [
    string('_id', { $comment: 'A unique identifier.' }),
    string('image', { $comment: 'Value is a URI for an image.' }),
    objectWith('Address', ['_id', 'city', 'country', 'name', 'street', 'zipCode']),
    object('ApiRoot'),
    objectWith('Order', ['_id', 'orderDate', 'orderStatus', 'orderItems', 'payment', 'billingAddress', 'shippingAddress'], ['cancellationReason']),
    objectWith('OrderHistory', ['orders']),
    objectWith('PaymentOption', ['_id', 'accountOwner', 'bic', 'iban']),
    objectWith('Product', ['_id', 'image', 'price', 'productDescription', 'productName']),
    objectWith('SearchResults', ['products', 'totalResults']),
    objectWith('ShoppingCart', ['items', 'totalPrice']),
    objectWith('ShoppingCartItem', ['_id', 'price', 'productDescription', 'productName', 'quantity', 'product']),
    objectWith('UserProfile', ['addresses', 'paymentOptions']),
    href('product', 'Product'),
    array('addresses', refSchema('Address'), { minItems: 1 }),
    array('items', refSchema('ShoppingCartItem')),
    array('orders', refSchema('Order')),
    array('paymentOptions', refSchema('PaymentOption'), { minItems: 1 }),
    array('products', refSchema('Product'))
];
