import { Body, Controller, Get, Param, Patch, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { sendResponse } from '../content-negotiation';
import { getAddressUri, getOrderPath, getOrdersBasePath, getOrdersRootPath, getOrderUri, getPaymentOptionUri, getShoppingCartItemUri } from '../routing';
import { EntityId } from '../store';
import { OrderService } from './order.service';
import { renderOrder, renderOrderHistory } from './orders.html';

@Controller(getOrdersBasePath())
export class OrdersController {

    constructor(
        private orderService: OrderService
    ) {}

    @Get(getOrdersRootPath())
    async getOrderHistory(
        @Res() response: Response
    ) {
        const orders = await this.orderService.getOrders();

        return sendResponse(response, {
            json: orders,
            html: renderOrderHistory(orders),
            // [jsonHalWithProfile]: hal.fromOrders(orders),
            // [jsonLdWithProfile]: ld.fromOrders(orders)
        });
    }

    @Post(getOrdersRootPath())
    async placeOrder(
        @Res() response: Response,
        @Req() request: Request,
        @Body('items') items: EntityId[],
        @Body('billingAddress') billingAddress: EntityId,
        @Body('shippingAddress') shippingAddress: EntityId,
        @Body('payment') payment: EntityId
    ) {
        const itemIds = items.map(item => item.replace(new RegExp(getShoppingCartItemUri('(.*)')), '$1') as EntityId);
        const billingAddressId = billingAddress.replace(new RegExp(getAddressUri('(.*)')), '$1');
        const shippingAddressId = shippingAddress.replace(new RegExp(getAddressUri('(.*)')), '$1');
        const paymentId = payment.replace(new RegExp(getPaymentOptionUri('(.*)')), '$1');

        const orderId = await this.orderService.placeOrder({
            items: itemIds,
            billingAddress: billingAddressId,
            shippingAddress: shippingAddressId,
            payment: paymentId
        });

        const statusCode = request.accepts('html') ? 303 : 201;
        return response.redirect(statusCode, getOrderUri(orderId));
    }

    @Get(getOrderPath())
    async getOrder(
        @Res() response: Response,
        @Param('orderId') orderId: EntityId,
    ) {
        const order = await this.orderService.getOrder(orderId);

        return sendResponse(response, {
            json: order,
            html: renderOrder(order),
            // [jsonHalWithProfile]: hal.fromOrder(order),
            // [jsonLdWithProfile]: ld.fromOrder(order)
        });
    }

    @Patch(getOrderPath())
    async cancelOrder(
        @Res() response: Response,
        @Param('orderId') orderId: EntityId,
        @Body('cancellationReason') cancellationReason: string,
    ) {
        await this.orderService.cancelOrder(orderId, cancellationReason);

        return response.redirect(303, getOrderUri(orderId))
    }
  }
