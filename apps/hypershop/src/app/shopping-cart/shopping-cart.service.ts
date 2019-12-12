import { Inject, Injectable } from '@nestjs/common';
import { isNull } from 'lodash';
import { Product, ProductService } from '../products';
import { ShoppingCartItem } from '../shopping-cart';
import { createStore, EntityId } from '../store';

export const SHOPPING_CART_ITEM_STORE = 'SHOPPING_CART_ITEM_STORE';

@Injectable()
export class ShoppingCartService {

    constructor(
        @Inject(SHOPPING_CART_ITEM_STORE) private store = createStore<ShoppingCartItem>(),
        private productService: ProductService
    ) {}

    public getShoppingCart() {
        return this.store.find()
            .then(shoppingCartItems => {
                return {
                    items: shoppingCartItems,
                    totalPrice: getTotalPrice(shoppingCartItems)
                };
            });
    }

    public getShoppingCartItem(id: EntityId) {
        return this.store.getOne(id);
    }

    public addShoppingCartItem(productId: EntityId, quantity: number) {
        return Promise.all([
            this.productService.getProduct(productId),
            this.getShoppingCartItemByProductId(productId)
        ])
            .then(([product, shoppingCartItem]) => {
                if (isNull(shoppingCartItem)) {
                    return this.createShoppingCartItem(product, quantity);
                } else {
                    return this.updateShoppingCartItemQuantity(
                        shoppingCartItem!._id!,
                        shoppingCartItem!.quantity + quantity
                    )
                        .then(() => shoppingCartItem._id);
                }
            });
    }

    public deleteShoppingCartItem(id: EntityId) {
        return this.store.remove(id);
    }

    public emptyShoppingCart() {
        return this.store.removeAll();
    }

    public updateShoppingCartItemQuantity(id: EntityId, quantity: number) {
        return this.store.update(
            id,
            { quantity }
        );
    }

    private createShoppingCartItem(product: Product, quantity: number) {
        return this.store.insert({
            name: product.name,
            description: product.description,
            price: product.price,
            quantity: quantity,
            product: product._id!
        });
    }

    private getShoppingCartItemByProductId(productId: EntityId) {
        return this.store.find({
            product: productId
        })
            .then(shoppingCartItems => shoppingCartItems.length > 0 ? shoppingCartItems[0] : null);
    }
}

function getTotalPrice(shoppingCartItems: ShoppingCartItem[]) {
    return shoppingCartItems.reduce(
        (sum, item) => (sum + (item.price * item.quantity)),
        0
    );
}
