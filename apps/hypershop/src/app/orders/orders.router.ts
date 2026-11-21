import { asyncHandler } from '@hypercontract/express';
import { Router } from 'express';
import { sendResponse } from '../formats/handler';
import { MediaType } from '../formats/media-type';
import { getAddressUri, getOrderPath, getOrdersRootPath, getOrderUri, getPaymentOptionUri, getShoppingCartItemUri } from '../routing';
import { EntityId } from '../store';
import { OrderService } from './order.service';
import { renderOrder, renderOrderHistory } from './orders.html';
import { toJsonOrder, toJsonOrderHistory } from './orders.json';
import { toJsonHalOrder, toJsonHalOrderHistory as toJsonHalOrderHistory } from './orders.json-hal';
import { toJsonLdOrder, toJsonLdOrderHistory } from './orders.json-ld';

export function createOrdersRouter(orderService: OrderService): Router {
    const router = Router();

    router.get(getOrdersRootPath(), asyncHandler(async (_request, response) => {
        const orderHistory = await orderService.getOrderHistory();

        return sendResponse(response, {
            json: toJsonOrderHistory(orderHistory),
            html: renderOrderHistory(orderHistory),
            [MediaType.JsonHal]: toJsonHalOrderHistory(orderHistory),
            [MediaType.JsonLd]: toJsonLdOrderHistory(orderHistory)
        });
    }));

    router.post(getOrdersRootPath(), asyncHandler(async (request, response) => {
        const shoppingCartItems = request.body?.shoppingCartItems as EntityId[];
        const billingAddress = request.body?.billingAddress as EntityId;
        const shippingAddress = request.body?.shippingAddress as EntityId;
        const payment = request.body?.payment as EntityId;

        const shoppingCartItemIds = shoppingCartItems.map(item => item.replace(new RegExp(getShoppingCartItemUri('(.*)')), '$1') as EntityId);
        const billingAddressId = billingAddress.replace(new RegExp(getAddressUri('(.*)')), '$1');
        const shippingAddressId = shippingAddress.replace(new RegExp(getAddressUri('(.*)')), '$1');
        const paymentId = payment.replace(new RegExp(getPaymentOptionUri('(.*)')), '$1');

        const orderId = await orderService.placeOrder({
            shoppingCartItems: shoppingCartItemIds,
            billingAddress: billingAddressId,
            shippingAddress: shippingAddressId,
            payment: paymentId
        });

        const statusCode = request.accepts('html') ? 303 : 201;
        return response.redirect(statusCode, getOrderUri(orderId));
    }));

    router.get(getOrderPath(), asyncHandler(async (request, response) => {
        const orderId = request.params.orderId;

        const order = await orderService.getOrder(orderId);

        return sendResponse(response, {
            json: toJsonOrder(order),
            html: renderOrder(order),
            [MediaType.JsonHal]: toJsonHalOrder(order),
            [MediaType.JsonLd]: toJsonLdOrder(order)
        });
    }));

    router.patch(getOrderPath(), asyncHandler(async (request, response) => {
        const orderId = request.params.orderId;
        const cancellationReason = request.body?.cancellationReason as string;

        await orderService.cancelOrder(orderId, cancellationReason);

        return response.redirect(303, getOrderUri(orderId));
    }));

    return router;
}
