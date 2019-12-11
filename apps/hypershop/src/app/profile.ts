import { Cardinality, EntryPoint, entryPoint, HttpMethod, jsonLdContext, operation, Operation, Precondition, precondition, Profile, RepresentationClass, representationClass, representationProperty, RepresentationProperty, StateTransition, stateTransition, xsd } from '@hypercontract/profile';
import { flatten, trimEnd } from 'lodash';
import { Quad } from 'rdf-js';
import { prefixes, shop } from './namespaces';
import { schemas } from './schemas';

const profileUri = trimEnd(shop(''), '/');
const defaultNamespace = shop('');

const shopEntryPoint = (name: string, definition: EntryPoint) => entryPoint(shop(name), definition);
const shopClass = (name: string, definition: RepresentationClass) => representationClass(shop(name), definition);
const shopProperty = (name: string, definition: RepresentationProperty) => representationProperty(shop(name), definition);
const shopStateTransition = (name: string, definition: StateTransition) => stateTransition(shop(name), definition);
const shopOperation = (name: string, definition: Operation) => operation(shop(name), definition);
const shopPrecondition = (name: string, definition: Precondition) => precondition(shop(name), definition);
const shopSchemas = (name: string) => schemas.get(shop(name));

const profileGraph: Quad[] = flatten([
    shopEntryPoint('ApiRoot', {
        label: 'API Root',
        description: 'The entry point for the hypershop REST API.'
    }),
    shopClass('AdditionToShoppingCart', {
        label: 'Addition to Shopping Cart',
        description: 'All information necessary to add a Product to the Shopping Cart.'
    }),
    shopClass('Address', {
        label: 'Address',
        description: 'Postal addressed that can be used as Billing Address or Shipping Address when placing an Order. The Order will contain a copy of the address. Changes to an Address do not affect Orders that have been previously placed with that Address.'
    }),
    shopClass('BillingAddress', {
        label: 'Billing Address',
        description: 'The postal address to which the goods will be sent. This is a copy of an Address from the User Profile at the time when the Order was placed.'
    }),
    shopClass('NewOrder', {
        label: 'New Order',
        description: 'All information necessary to place a new Order.'
    }),
    shopClass('Order', {
        label: 'Order',
        description: 'An order that has been placed by the user. The Order may be in processing, already fulfilled or cancelled.'
    }),
    shopClass('OrderCancellation', {
        label: 'Order Cancellation',
        description: 'All information necessary to cancel an Order.'
    }),
    shopClass('OrderItem', {
        label: 'Order Item',
        description: 'A Product and its quantity as it has been ordered. The Order Item contains a copy of all Product information at the time when the Order was placed.'
    }),
    shopClass('Orders', {
        label: 'Orders',
        description: 'The Order history containing all Orders that are currently being processed, already fulfilled or have been cancelled by the user.'
    }),
    shopClass('Payment', {
        label: 'Payment',
        description: 'The payment details that are used to pay for the Order. This is a copy of a Payment Option from the User Profile at the time when the Order was placed.'
    }),
    shopClass('PaymentOption', {
        label: 'Payment Option',
        description: 'Payment details that can be used for Payment when placing an Order. The Order will contain a copy of all payment details. Changes to a Payment Option do not affect Orders that have been previously placed with that Payment Option.'
    }),
    shopClass('Product', {
        label: 'Product',
        description: 'A Product that can be ordered.'
    }),
    shopClass('QuantityChange', {
        label: 'Quantity Change',
        description: 'All information necessary to change the quantity of a Shopping Cart Item.'
    }),
    shopClass('SearchQuery', {
        label: 'Search Query',
        description: 'Search criteria used to search the catalog for Products.'
    }),
    shopClass('SearchResults', {
        label: 'Search Results',
        description: 'A list of Products matching a Search Query.'
    }),
    shopClass('ShippingAddress', {
        label: 'Shipping Address',
        description: 'The postal address to which the invoice will be sent. This is a copy of an Address from the User Profile at the time when the Order was placed.'
    }),
    shopClass('ShoppingCart', {
        label: 'Shopping Cart',
        description: 'A list of Products that the user wants to order.'
    }),
    shopClass('ShoppingCartItem', {
        label: 'Shopping Cart Item',
        description: 'A Product and the quantity the user wants to order. The Shopping Cart Item contains a copy of all Product information at the time when the Product was added to the Shopping Cart.'
    }),
    shopClass('ShoppingCartItems', {
        label: 'Shopping Cart Items',
        description: 'The list of Shopping Cart Items that have been added to the Shopping Cart'
    }),
    shopClass('UserProfile', {
        label: 'User Profile',
        description: 'Available Addresses and Payment Options of a user.'
    }),
    shopProperty('accountOwner', {
        label: 'account owner',
        description: 'The owner of a banking account.',
        domain: [
            shop('Payment'),
            shop('PaymentOption')
        ],
        range: [xsd('string')],
        schemas: shopSchemas('accountOwner')
    }),
    shopProperty('bic', {
        label: 'bic',
        description: 'The BIC of a banking account.',
        domain: [
            shop('Payment'),
            shop('PaymentOption')
        ],
        range: [xsd('string')],
        schemas: shopSchemas('bic')
    }),
    shopProperty('billingAddress', {
        label: 'billing address',
        description: 'A reference to the Billing Address of an Order. The name in the Billing Address does not have to be identical to the name of the account owner of the chosen Payment.',
        domain: [
            shop('NewOrder')
        ],
        range: [
            shop('BillingAddress')
        ],
        schemas: shopSchemas('billingAddress')
    }),
    shopProperty('cancellationReason', {
        schemas: shopSchemas('cancellationReason'),
        label: 'cancellation reason',
        description: 'A free-text reason for why the Order was or is being cancelled.',
        domain: [
            shop('Order'),
            shop('OrderCancellation')
        ],
        range: [xsd('string')]
    }),
    shopProperty('city', {
        schemas: shopSchemas('city'),
        label: 'city',
        description: 'The city of an Address.',
        domain: [
            shop('Address'),
            shop('BillingAddress'),
            shop('ShippingAddress')
        ],
        range: [xsd('string')]
    }),
    shopProperty('country', {
        schemas: shopSchemas('country'),
        label: 'country',
        description: 'The name of the country of an Address.',
        domain: [
            shop('Address'),
            shop('BillingAddress'),
            shop('ShippingAddress')
        ],
        range: [xsd('string')]
    }),
    shopProperty('iban', {
        schemas: shopSchemas('iban'),
        label: 'iban',
        description: 'The IBAN of a banking account.',
        domain: [
            shop('Payment'),
            shop('PaymentOption')
        ],
        range: [xsd('string')]
    }),
    shopProperty('name', {
        schemas: shopSchemas('name'),
        label: 'name',
        description: 'The first and last name of the addressee of an Address.',
        domain: [
            shop('Address'),
            shop('BillingAddress'),
            shop('ShippingAddress')
        ],
        range: [xsd('string')]
    }),
    shopProperty('orderDate', {
        schemas: shopSchemas('orderDate'),
        label: 'order date',
        description: 'The date when the Order was placed.',
        domain: [
            shop('Order')
        ],
        range: [xsd('date')]
    }),
    shopProperty('orderItem', {
        schemas: shopSchemas('orderItem'),
        label: 'order item',
        description: 'A reference to an Order Item of an Order.',
        domain: [
            shop('Order')
        ],
        range: [
            shop('OrderItem')
        ],
        cardinality: Cardinality.OneOrMore
    }),
    shopProperty('orderStatus', {
        label: 'order status',
        description: 'The status of the Order. Either "Processing", "Delivered" or "Cancelled".',
        domain: [
            shop('Order')
        ],
        // TODO: find a way to represent enums
        range: [xsd('string')],
        schemas: shopSchemas('orderStatus')
    }),
    shopProperty('payment', {
        label: 'payment',
        description: 'A reference to the Payment of an Order. The name of the account owner does not have to be indentical to the name in the chosen Billing Address.',
        domain: [
            shop('NewOrder')
        ],
        range: [
            shop('Payment')
        ],
        schemas: shopSchemas('payment')
    }),
    shopProperty('price', {
        label: 'price',
        description: 'The price per item.',
        domain: [
            shop('Product'),
            shop('OrderItem'),
            shop('ShoppingCartItem')
        ],
        // TODO: min: 0.01
        range: [xsd('decimal')],
        schemas: shopSchemas('price')
    }),
    shopProperty('productDescription', {
        label: 'product description',
        description: 'A description of the Product\'s features and qualities.',
        domain: [
            shop('Product'),
            shop('OrderItem'),
            shop('ShoppingCartItem')
        ],
        range: [xsd('string')],
        schemas: shopSchemas('productDescription')
    }),
    shopProperty('productName', {
        label: 'product name',
        description: 'The name of the Product.',
        domain: [
            shop('Product'),
            shop('OrderItem'),
            shop('ShoppingCartItem')
        ],
        range: [xsd('string')],
        schemas: shopSchemas('productName')
    }),
    shopProperty('quantity', {
        label: 'quantity',
        description: 'The number of items ordered or to be ordered.',
        domain: [
            shop('AdditionToShoppingCart'),
            shop('OrderItem'),
            shop('QuantityChange'),
            shop('ShoppingCartItem')
        ],
        // TODO: min: 1
        range: [xsd('integer')],
        schemas: shopSchemas('quantity')
    }),
    shopProperty('queryString', {
        label: 'query string',
        description: 'A free-text search term that is used to search the catalog for Products. It is matched against the product name and the product description.',
        domain: [
            shop('SearchQuery')
        ],
        range: [xsd('string')],
        schemas: shopSchemas('queryString')
    }),
    shopProperty('shoppingCartItems', {
        label: 'shopping cart items',
        description: 'A reference to Shopping Cart Items in the Shopping Cart.',
        domain: [
            shop('NewOrder')
        ],
        range: [
            shop('ShoppingCartItem')
        ],
        cardinality: Cardinality.OneOrMore,
        schemas: shopSchemas('shoppingCartItems')
    }),
    shopProperty('shippingAddress', {
        label: 'shipping address',
        description: 'A reference to the Shipping Address of an Order.',
        domain: [
            shop('NewOrder')
        ],
        range: [
            shop('ShippingAddress')
        ],
        schemas: shopSchemas('shippingAddress')
    }),
    shopProperty('street', {
        label: 'street',
        description: 'The street name and house number of an Address.',
        domain: [
            shop('Address'),
            shop('BillingAddress'),
            shop('ShippingAddress')
        ],
        range: [xsd('string')],
        schemas: shopSchemas('street')
    }),
    shopProperty('totalPrice', {
        label: 'total price',
        description: 'The total price of all items in the Shopping Cart. It is calculated by summing up the item\'s prices multiplied with their respective quantities.',
        domain: [
            shop('ShoppingCart')
        ],
        // TODO: min: 0.01
        range: [xsd('decimal')],
        schemas: shopSchemas('totalPrice')
    }),
    shopProperty('totalResults', {
        label: 'total results',
        description: 'The total number of results matching the Search Query.',
        domain: [
            shop('SearchResults')
        ],
        // TODO: min: 0
        range: [xsd('integer')],
        schemas: shopSchemas('totalResults')
    }),
    shopProperty('zipCode', {
        label: 'zip code',
        description: 'The ZIP code of an Address. There are no restrictions on the ZIP code\'s format.',
        domain: [
            shop('Address'),
            shop('BillingAddress'),
            shop('ShippingAddress')
        ],
        range: [xsd('string')],
        schemas: shopSchemas('zipCode')
    }),
    shopStateTransition('address', {
        label: 'address',
        description: 'A reference to an Address in a User Profile.',
        domain: [
            shop('UserProfile')
        ],
        range: [
            shop('Address')
        ],
        cardinality: Cardinality.OneOrMore
    }),
    shopStateTransition('image', {
        label: 'image',
        description: 'A picture of the Product.',
        domain: [
            shop('Product')
        ],
        range: []
    }),
    shopStateTransition('orders', {
        label: 'orders',
        description: 'A link to all Orders.',
        domain: [
            shop('ApiRoot')
        ],
        range: [
            shop('Orders')
        ]
    }),
    shopStateTransition('paymentOption', {
        label: 'payment option',
        description: 'A reference to a Payment Option in a User Profile.',
        domain: [
            shop('UserProfile')
        ],
        range: [
            shop('PaymentOption')
        ],
        cardinality: Cardinality.OneOrMore
    }),
    shopStateTransition('product', {
        label: 'product',
        description: 'A reference to a Product from the catalog.',
        domain: [
            shop('AdditionToShoppingCart'),
            shop('CartShoppingCartItem')
        ],
        range: [
            shop('Product')
        ]
    }),
    shopStateTransition('products', {
        label: 'products',
        description: 'A reference to Products from the catalog.',
        domain: [
            shop('SearchResults')
        ],
        range: [
            shop('Product')
        ],
        cardinality: Cardinality.OneOrMore
    }),
    shopStateTransition('shoppingCart', {
        label: 'shopping cart',
        description: 'A link to the Shopping Cart.',
        domain: [
            shop('ApiRoot')
        ],
        range: [
            shop('ShoppingCart')
        ]
    }),
    shopStateTransition('shoppingCartItem', {
        label: 'shopping cart item',
        description: 'A reference to a Shopping Cart Item in the Shopping Cart.',
        domain: [
            shop('ShoppingCart')
        ],
        range: [
            shop('ShoppingCartItem')
        ],
        cardinality: Cardinality.ZeroOrMore
    }),
    shopStateTransition('userProfile', {
        label: 'user profile',
        description: 'A link to the UserProfile.',
        domain: [
            shop('ApiRoot')
        ],
        range: [
            shop('UserProfile')
        ]
    }),
    shopOperation('addToShoppingCart', {
        label: 'add to shopping cart',
        description: 'Adds a Product as a new Shopping Cart Item to the Shopping Cart or increases the quantity of an existing Shopping Cart Item when the Product has already been added to the Shopping Cart.',
        domain: [
            shop('Product')
        ],
        range: [
            shop('ShoppingCartItems')
        ],
        method: HttpMethod.POST,
        expectedBody: shop('AdditionToShoppingCart'),
        returnedType: shop('ShoppingCart'),
    }),
    shopOperation('cancel', {
        label: 'cancel',
        description: 'Cancels the processing of an order. The status will be set to "Cancelled".',
        domain: [
            shop('Order')
        ],
        range: [
            shop('Order')
        ],
        method: HttpMethod.PATCH,
        expectedBody: shop('OrderCancellation'),
        returnedType: shop('Order'),
        constraints: [
            shop('isOrderCancellable'
        )]
    }),
    shopOperation('changeQuantity', {
        label: 'change quantity',
        description: 'Change the quantity of a Shopping Cart Item.',
        domain: [
            shop('ShoppingCartItem')
        ],
        range: [
            shop('ShoppingCartItem')
        ],
        method: HttpMethod.PATCH,
        expectedBody: shop('QuantityChange'),
        returnedType: shop('ShoppingCart'),
    }),
    shopOperation('placeOrder', {
        label: 'place order',
        description: 'Places a new Order based on the provided information. The Shopping Cart will be emptied after the Order has been successfully created.',
        domain: [
            shop('ShoppingCart')
        ],
        range: [
            shop('Orders')
        ],
        method: HttpMethod.POST,
        expectedBody: shop('NewOrder'),
        returnedType: shop('Order'),
        constraints: [
            shop('isShoppingCartOrderable'
        )]
    }),
    shopOperation('remove', {
        label: 'remove',
        description: 'Removes a Shopping Cart Item from the Shopping Cart.',
        domain: [
            shop('ShoppingCartItem')
        ],
        range: [
            shop('ShoppingCartItem')
        ],
        method: HttpMethod.DELETE,
        returnedType: shop('ShoppingCart'),
    }),
    shopOperation('searchCatalog', {
        label: 'search catalog',
        description: 'Searches the catalog for Products matching a Search Query. When no Search Query is provided, all Products will be returned.',
        domain: [
            shop('ApiRoot')
        ],
        range: [
            shop('SearchResults')
        ],
        method: HttpMethod.GET,
        expectedQueryParams: shop('SearchQuery'),
        returnedType: shop('SearchResults'),
    }),
    shopPrecondition('isOrderCancellable', {
        label: 'is order cancellable?',
        description: 'An Order can only be cancelled if the order status is still in "Processing".'
    }),
    shopPrecondition('isShoppingCartOrderable', {
        label: 'is shopping cart orderable?',
        description: 'An Order can only be placed if there is at least one Shopping Cart Item in the Shopping Cart.'
    })
]);

export const profile: Profile = {
    uri: profileUri,
    defaultNamespace,
    graph: profileGraph,
    prefixes,
    jsonLdContext
};
