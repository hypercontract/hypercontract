import { namedNode, quad } from '@rdfjs/data-model';
import { Quad } from 'rdf-js';
import { owl, rdf, shop } from './namespaces';

export const profileGraph = namedNode(shop(''));

const representationClass = (uri: string) => quad(
    namedNode(uri),
    namedNode(rdf('type')),
    namedNode(owl('Class'))
);

const representationDescriptor = (uri: string) => quad(
    namedNode(uri),
    namedNode(rdf('type')),
    namedNode(owl('DatatypeProperty'))
);

const representationLinkRelationType = (uri: string) => quad(
    namedNode(uri),
    namedNode(rdf('type')),
    namedNode(owl('ObjectProperty'))
);

const hyperPrecondition = (uri: string) => quad(
    namedNode(uri),
    namedNode(rdf('type')),
    namedNode(owl('ObjectProperty'))
);

const shopClass = (name: string) => representationClass(shop(name));
const shopDescriptor = (name: string) => representationDescriptor(shop(name));
const shopLinkRelationType = (name: string) => representationLinkRelationType(shop(name));
const shopPrecondition = (name: string) => hyperPrecondition(shop(name));

export const profile: Quad[] = [
    shopClass('SearchQuery'),
    shopClass('SearchResults'),
    shopClass('Product'),
    shopClass('AdditionToShoppingCart'),
    shopClass('ShoppingCart'),
    shopClass('ShoppingCartItem'),
    shopClass('QuantityChange'),
    shopClass('UserProfile'),
    shopClass('OrderCancellation'),
    shopClass('NewOrder'),
    shopClass('PaymentOption'),
    shopClass('Address'),
    shopClass('Order'),
    shopClass('ShippingAddress'),
    shopClass('BillingAddress'),
    shopClass('OrderItem'),
    shopClass('Payment'),
    shopDescriptor('queryString'),
    shopLinkRelationType('product'),
    shopDescriptor('totalResults'),
    shopDescriptor('productName'),
    shopDescriptor('productDescription'),
    shopDescriptor('price'),
    shopLinkRelationType('image'),
    shopDescriptor('quantity'),
    shopLinkRelationType('shoppingCartItem'),
    shopDescriptor('totalPrice'),
    shopLinkRelationType('address'),
    shopLinkRelationType('paymentOption'),
    shopDescriptor('reason'),
    shopLinkRelationType('payment'),
    shopLinkRelationType('billingAddress'),
    shopLinkRelationType('shippingAddress'),
    shopDescriptor('accountOwner'),
    shopDescriptor('iban'),
    shopDescriptor('bic'),
    shopDescriptor('name'),
    shopDescriptor('street'),
    shopDescriptor('zipCode'),
    shopDescriptor('country'),
    shopDescriptor('orderDate'),
    shopDescriptor('orderStatus'),
    shopDescriptor('cancellationReason'),
    shopLinkRelationType('orderItem'),
    shopLinkRelationType('searchCatalog'),
    shopLinkRelationType('addToShoppingCart'),
    shopLinkRelationType('changeQuantity'),
    shopLinkRelationType('placeOrder'),
    shopLinkRelationType('cancel'),
    shopPrecondition('isShoppingCartOrderable'),
    shopPrecondition('isOrderCancellable')
];
