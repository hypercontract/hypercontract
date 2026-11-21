import { asyncHandler } from '@hypercontract/express';
import { Router } from 'express';
import { sendResponse } from '../formats/handler';
import { MediaType } from '../formats/media-type';
import { getProductUri, getShoppingCartItemPath, getShoppingCartItemsPath, getShoppingCartRootPath, getShoppingCartRootUri } from '../routing';
import { EntityId } from '../store';
import { UserProfileService } from '../user-profile';
import { toJsonHalShoppingCart } from './shoppig-cart.json-hal';
import { renderShoppingCart } from './shopping-cart.html';
import { toJsonShoppingCart } from './shopping-cart.json';
import { toJsonLdShoppingCart } from './shopping-cart.json-ld';
import { ShoppingCartService } from './shopping-cart.service';

export function createShoppingCartRouter(
    shoppingCartService: ShoppingCartService,
    userProfileService: UserProfileService
): Router {
    const router = Router();

    router.get(getShoppingCartRootPath(), asyncHandler(async (_request, response) => {
        const [shoppingCart, userProfile] = await Promise.all([
            shoppingCartService.getShoppingCart(),
            userProfileService.getUserProfile()
        ]);

        return sendResponse(response, {
            json: toJsonShoppingCart(shoppingCart),
            html: renderShoppingCart(shoppingCart, userProfile),
            [MediaType.JsonHal]: toJsonHalShoppingCart(shoppingCart),
            [MediaType.JsonLd]: toJsonLdShoppingCart(shoppingCart)
        });
    }));

    router.post(getShoppingCartItemsPath(), asyncHandler(async (request, response) => {
        const product = request.body?.product as EntityId;
        const quantity = request.body?.quantity as number;

        const productId = product.replace(new RegExp(getProductUri('(.*)')), '$1');

        await shoppingCartService.addToShoppingCart(productId, quantity);

        const statusCode = request.accepts('html') ? 303 : 201;
        return response.redirect(statusCode, getShoppingCartRootUri());
    }));

    router.patch(getShoppingCartItemPath(), asyncHandler(async (request, response) => {
        const shoppingCartItemId = request.params.shoppingCartItemId;
        const quantity = request.body?.quantity as number;

        await shoppingCartService.changeQuantity(shoppingCartItemId, quantity);

        return response.redirect(303, getShoppingCartRootUri());
    }));

    router.delete(getShoppingCartItemPath(), asyncHandler(async (request, response) => {
        const shoppingCartItemId = request.params.shoppingCartItemId;

        await shoppingCartService.remove(shoppingCartItemId);

        return response.redirect(303, getShoppingCartRootUri());
    }));

    return router;
}
