import { jsonSchema, jsonSchemaDate, jsonSchemaDecimal, jsonSchemaInteger, jsonSchemaString } from '@hypercontract/profile';

export const accountOwner = [jsonSchemaString()];
export const bic = [jsonSchemaString()];
export const billingAddress = [jsonSchema({})]; // billingAddress: jsonSchema BillingAddress()
export const cancellationReason = [jsonSchemaString()];
export const city = [jsonSchemaString()];
export const country = [jsonSchemaString()];
export const iban = [jsonSchemaString()];
export const name = [jsonSchemaString()];
export const orderDate = [jsonSchemaDate()];
export const orderItem = [jsonSchema({})]; // orderItem: jsonSchema OrderItem OneOrMore()
export const orderStatus = [jsonSchemaString({ enum: ['Processing', 'Delivered', 'Cancelled'] })];
export const payment = [jsonSchema({})]; // payment: jsonSchema Payment()
export const price = [jsonSchemaDecimal({ multipleOf: 0.01, minimum: 0.01 })];
export const productDescription = [jsonSchemaString()];
export const productName = [jsonSchemaString()];
export const quantity = [jsonSchemaInteger({ multipleOf: 1, minimum: 1 })];
export const queryString = [jsonSchemaString()];
export const shoppingCartItems = [jsonSchema({})]; // shoppingCartItems: jsonSchema ShoppingCartItem OneOrMore()
export const shippingAddress = [jsonSchema({})]; // shippingAddress: jsonSchema ShippingAddress()
export const street = [jsonSchemaString()];
export const totalPrice = [jsonSchemaDecimal({ multipleOf: 0.01, minimum: 0.01 })];
export const totalResults = [jsonSchemaInteger({ multipleOf: 1, minimum: 0 })];
export const zipCode = [jsonSchemaString()];
