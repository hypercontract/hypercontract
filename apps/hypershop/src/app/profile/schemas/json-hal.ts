import { Schema } from '@hypercontract/profile';
import { MediaType } from '../../formats/media-type';
import { hal, halHref } from './json-hal-builder';
import { jsonSchemaFor } from './json-schema-builder';

const { array, object, refSchema } = jsonSchemaFor(MediaType.JsonHal);

export const jsonHalSchemas: Schema[] = [
    object('Address', hal(['city', 'country', 'name', 'street', 'zipCode'])),
    object('ApiRoot', hal([], [], ['orderHistory', 'searchCatalog', 'shoppingCart', 'userProfile'])),
    object('Order', hal(['orderDate', 'orderStatus', 'orderItems', 'payment', 'billingAddress', 'shippingAddress'], ['cancellationReason'], ['cancel'])),
    object('OrderHistory', hal([], [], [], ['orders'])),
    object('PaymentOption', hal(['accountOwner', 'bic', 'iban'])),
    object('Product', hal(['price', 'productDescription', 'productName'], [], ['image', 'addToShoppingCart'])),
    object('SearchResults', hal(['totalResults'], [], [], ['products'])),
    object('ShoppingCart', hal(['totalPrice'], [], ['placeOrder'], ['items'])),
    object('ShoppingCartItem', hal(['price', 'productDescription', 'productName', 'quantity'], [], ['changeQuantity', 'remove', 'product'])),
    object('UserProfile', hal([], [], [], ['addresses', 'paymentOptions'])),
    array('addresses', refSchema('Address'), { minItems: 1 }),
    array('items', refSchema('ShoppingCartItem')),
    array('orders', refSchema('Order')),
    array('paymentOptions', refSchema('PaymentOption'), { minItems: 1 }),
    array('products', refSchema('Product')),
    halHref('addToShoppingCart', 'ShoppingCartItems'),
    halHref('cancel', 'Order'),
    halHref('changeQuantity', 'ShoppingCartItem'),
    halHref('orderHistory', 'OrderHistory'),
    halHref('placeOrder', 'OrderHistory'),
    halHref('product', 'Product'),
    halHref('remove', 'ShoppingCartItem'),
    halHref('searchCatalog', 'SearchResults'),
    halHref('shoppingCart', 'ShoppingCart'),
    halHref('userProfile', 'UserProfile')
];

