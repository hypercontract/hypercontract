import { handleRequestError, handleUnknownRoute, hypercontract } from '@hypercontract/express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import express, { Express } from 'express';
import { values } from 'lodash';
import methodOverride from 'method-override';
import { join } from 'node:path';
import { addressMocks, orderMocks, paymentOptionMocks, productMocks } from '../test';
import { createApiRootRouter } from './api-root/api-root.router';
import { MediaType } from './formats/media-type';
import { OrderService } from './orders/order.service';
import { createOrdersRouter } from './orders/orders.router';
import { ProductService } from './products/product.service';
import { createProductsRouter } from './products/products.router';
import { profile } from './profile';
import { getAddressBasePath, getOrdersBasePath, getPaymentOptionBasePath, getProductsBasePath, getShoppingCartBasePath, getUserProfileBasePath } from './routing';
import { ShoppingCartItem } from './shopping-cart';
import { createShoppingCartRouter } from './shopping-cart/shopping-cart.router';
import { ShoppingCartService } from './shopping-cart/shopping-cart.service';
import { createMockStore, createStore } from './store';
import { createAddressRouter } from './user-profile/addresses/address.router';
import { AddressService } from './user-profile/addresses/address.service';
import { createPaymentOptionRouter } from './user-profile/payment-options/payment-option.router';
import { PaymentOptionService } from './user-profile/payment-options/payment-option.service';
import { createUserProfileRouter } from './user-profile/user-profile.router';
import { UserProfileService } from './user-profile/user-profile.service';

export async function createApp(): Promise<Express> {
    const [productStore, addressStore, paymentOptionStore, orderStore] = await Promise.all([
        createMockStore(productMocks),
        createMockStore(addressMocks),
        createMockStore(paymentOptionMocks),
        createMockStore(orderMocks)
    ]);

    const products = new ProductService(productStore);
    const addresses = new AddressService(addressStore);
    const paymentOptions = new PaymentOptionService(paymentOptionStore);
    const userProfile = new UserProfileService(addresses, paymentOptions);
    const shoppingCart = new ShoppingCartService(createStore<ShoppingCartItem>(), products);
    const orders = new OrderService(orderStore, shoppingCart, userProfile);

    const app = express();
    app.set('views', __dirname);
    app.set('view engine', 'ejs');

    app.use(cors({ exposedHeaders: ['Location'] }));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json({ type: [MediaType.Json, MediaType.JsonHal, MediaType.JsonLd] }));
    app.use(methodOverride(request => {
        const method = request.body?._method;
        if (method !== undefined) {
            delete request.body._method;
        }
        return method;
    }));

    app.use(hypercontract(profile, values(MediaType)));
    app.use('/assets', express.static(join(__dirname, '../assets')));
    app.use(createApiRootRouter());
    app.use(getProductsBasePath(), createProductsRouter(products));
    app.use(getOrdersBasePath(), createOrdersRouter(orders));
    app.use(getShoppingCartBasePath(), createShoppingCartRouter(shoppingCart, userProfile));
    app.use(getUserProfileBasePath(), createUserProfileRouter(userProfile));
    app.use(getAddressBasePath(), createAddressRouter(addresses));
    app.use(getPaymentOptionBasePath(), createPaymentOptionRouter(paymentOptions));
    app.use(handleUnknownRoute);
    app.use(handleRequestError);

    return app;
}
