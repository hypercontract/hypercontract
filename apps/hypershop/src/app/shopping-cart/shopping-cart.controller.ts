import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { sendResponse } from '../content-negotiation';
import { getProductUri, getShoppingCartBasePath, getShoppingCartItemPath, getShoppingCartItemsPath, getShoppingCartRootPath, getShoppingCartRootUri } from '../routing';
import { UserProfileService } from '../user-profile';
import { renderShoppingCart } from './shopping-cart.html';
import { ShoppingCartService } from './shopping-cart.service';

@Controller(getShoppingCartBasePath())
export class ShoppingCartController {

    constructor(
        private shoppingCartService: ShoppingCartService,
        private userProfileService: UserProfileService
    ) {}

    @Get(getShoppingCartRootPath())
    async getShoppingCart(
        @Res() response: Response
    ) {
        const [shoppingCart, userProfile] = await Promise.all([
            this.shoppingCartService.getShoppingCart(),
            this.userProfileService.getUserProfile()
        ]);

        return sendResponse(response, {
            // json: shoppingCart,
            html: renderShoppingCart(shoppingCart, userProfile),
            // [jsonHalWithProfile]: hal.fromShoppingCart(shoppingCart),
            // [jsonLdWithProfile]: ld.fromShoppingCart(shoppingCart)
        })
    }

    @Post(getShoppingCartItemsPath())
    async addToShoppingCart(
        @Res() response: Response,
        @Req() request: Request,
        @Body('product') product: string,
        @Body('quantity') quantity: number
    ) {
        const productId = product.replace(new RegExp(getProductUri('(.*)')), '$1');

        await this.shoppingCartService.addShoppingCartItem(productId, quantity);

        const statusCode = request.accepts('html') ? 303 : 201;
        return response.redirect(statusCode, getShoppingCartRootUri());
    }

    @Patch(getShoppingCartItemPath())
    async changeQuantity(
        @Res() response: Response,
        @Param('shoppingCartItemId') shoppingCartItemId: string,
        @Body('quantity') quantity: number
    ) {
        await this.shoppingCartService.updateShoppingCartItemQuantity(shoppingCartItemId, quantity);

        return response.redirect(303, getShoppingCartRootUri());
    }

    @Delete(getShoppingCartItemPath())
    async remove(
        @Res() response: Response,
        @Param('shoppingCartItemId') shoppingCartItemId: string,
    ) {
        await this.shoppingCartService.deleteShoppingCartItem(shoppingCartItemId);

        return response.redirect(303, getShoppingCartRootUri());
    }
}
