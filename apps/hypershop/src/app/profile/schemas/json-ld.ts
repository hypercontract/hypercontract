import { Schema } from '@hypercontract/profile';
import { MediaType } from '../../content-negotiation';
import { jsonSchemaFor } from './json-schema-builder';

const { array, empty, href, objectWith, resourceSchema, resource, string } = jsonSchemaFor(MediaType.JsonLd);

export const jsonLdSchemas: Schema[] = [
    string('@id', { $comment: 'A unique identifier.' }),
    empty('@context', { type: ['object', 'string'] }),
    string('image', { $comment: 'Value is a URI for an image.' }),
    objectWith('Address', ['@id', 'city', 'country', 'name', 'street', 'zipCode'], ['@context']),
    objectWith('ApiRoot', ['@context', '@id'], ['orderHistory', 'searchCatalog', 'shoppingCart', 'userProfile']),
    objectWith('Order', ['@id', 'orderDate', 'orderStatus', 'orderItems', 'payment', 'billingAddress', 'shippingAddress'], ['@context', 'cancellationReason', 'cancel']),
    objectWith('OrderHistory', ['@context', '@id', 'orders']),
    objectWith('PaymentOption', ['@id', 'accountOwner', 'bic', 'iban'], ['@context']),
    objectWith('Product', ['@id', 'image', 'price', 'productDescription', 'productName'], ['@context', 'addToShoppingCart']),
    objectWith('SearchResults', ['@context', '@id', 'products', 'totalResults']),
    objectWith('ShoppingCart', ['@context', 'items', 'totalPrice'], ['placeOrder']),
    objectWith('ShoppingCartItem', ['@id', 'price', 'productDescription', 'productName', 'quantity', 'product'], ['@context', 'changeQuantity', 'remove']),
    objectWith('UserProfile', ['@context', '@id', 'addresses', 'paymentOptions']),
    resource('product', 'Product'),
    array('addresses', resourceSchema('Address'), { minItems: 1 }),
    array('items', resourceSchema('ShoppingCartItem')),
    array('orders', resourceSchema('Order')),
    array('paymentOptions', resourceSchema('PaymentOption'), { minItems: 1 }),
    array('products', resourceSchema('Product')),
    href('addToShoppingCart', 'ShoppingCartItems'),
    href('cancel', 'Order'),
    href('changeQuantity', 'ShoppingCartItem'),
    href('orderHistory', 'OrderHistory'),
    href('placeOrder', 'OrderHistory'),
    href('remove', 'ShoppingCartItem'),
    href('searchCatalog', 'SearchResults'),
    href('shoppingCart', 'ShoppingCart'),
    href('userProfile', 'UserProfile')
];

