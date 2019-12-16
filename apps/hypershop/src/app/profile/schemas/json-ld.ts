import { Schema } from '@hypercontract/profile';
import { MediaType } from '../../formats/media-type';
import { jsonSchemaFor } from './json-schema-builder';

const { array, empty, href, objectWith, resourceSchema, resource, string } = jsonSchemaFor(MediaType.JsonLd);

export const jsonLdSchemas: Schema[] = [
    string('@id', { $comment: 'A unique identifier.' }),
    empty('@context', { type: ['object', 'string'] }),
    objectWith('Address', ['@id', 'city', 'country', 'name', 'street', 'zipCode'], ['@context']),
    objectWith('ApiRoot', ['@id'], ['@context', 'orderHistory', 'searchCatalog', 'shoppingCart', 'userProfile']),
    objectWith('Order', ['@id', 'orderDate', 'orderStatus', 'orderItems', 'payment', 'billingAddress', 'shippingAddress'], ['@context', 'cancellationReason', 'cancel']),
    objectWith('OrderHistory', ['@id', 'orders'], ['@context']),
    objectWith('PaymentOption', ['@id', 'accountOwner', 'bic', 'iban'], ['@context']),
    objectWith('Product', ['@id', 'image', 'price', 'productDescription', 'productName'], ['@context', 'addToShoppingCart']),
    objectWith('SearchResults', ['@id', 'products', 'totalResults'], ['@context']),
    objectWith('ShoppingCart', ['@id', 'items', 'totalPrice'], ['@context', 'placeOrder']),
    objectWith('ShoppingCartItem', ['@id', 'price', 'productDescription', 'productName', 'quantity', 'product'], ['@context', 'changeQuantity', 'remove']),
    objectWith('UserProfile', ['@id', 'addresses', 'paymentOptions'], ['@context']),
    resource('product', 'Product'),
    string('image', { $comment: 'Value is a URI for an image.' }),
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

