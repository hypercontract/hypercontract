import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { sendResponse } from '../formats/handler';
import { MediaType } from '../formats/media-type';
import { getProductUri, getShoppingCartBasePath, getShoppingCartItemPath, getShoppingCartItemsPath, getShoppingCartRootPath, getShoppingCartRootUri } from '../routing';
import { EntityId } from '../store';
import { UserProfileService } from '../user-profile';
import { toJsonHalShoppingCart } from './shoppig-cart.json-hal';
import { renderShoppingCart } from './shopping-cart.html';
import { toJsonShoppingCart } from './shopping-cart.json';
import { toJsonLdShoppingCart } from './shopping-cart.json-ld';
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
            json: toJsonShoppingCart(shoppingCart),
            html: renderShoppingCart(shoppingCart, userProfile),
            [MediaType.JsonHal]: toJsonHalShoppingCart(shoppingCart),
            [MediaType.JsonLd]: toJsonLdShoppingCart(shoppingCart)
        })
    }

    @Post(getShoppingCartItemsPath())
    async addToShoppingCart(
        @Res() response: Response,
        @Req() request: Request,
        @Body('product') product: EntityId,
        @Body('quantity') quantity: number
    ) {
        const productId = product.replace(new RegExp(getProductUri('(.*)')), '$1');

        await this.shoppingCartService.addToShoppingCart(productId, quantity);

        const statusCode = request.accepts('html') ? 303 : 201;
        return response.redirect(statusCode, getShoppingCartRootUri());
    }

    @Patch(getShoppingCartItemPath())
    async changeQuantity(
        @Res() response: Response,
        @Param('shoppingCartItemId') shoppingCartItemId: EntityId,
        @Body('quantity') quantity: number
    ) {
        await this.shoppingCartService.changeQuantity(shoppingCartItemId, quantity);

        return response.redirect(303, getShoppingCartRootUri());
    }

    @Delete(getShoppingCartItemPath())
    async remove(
        @Res() response: Response,
        @Param('shoppingCartItemId') shoppingCartItemId: EntityId,
    ) {
        await this.shoppingCartService.remove(shoppingCartItemId);

        return response.redirect(303, getShoppingCartRootUri());
    }
}
