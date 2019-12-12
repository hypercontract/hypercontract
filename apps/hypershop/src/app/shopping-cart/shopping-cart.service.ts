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

    public async getShoppingCart() {
        const shoppingCartItems = await this.store.find();

        return {
            items: shoppingCartItems,
            totalPrice: getTotalPrice(shoppingCartItems)
        };
    }

    public getShoppingCartItem(id: EntityId) {
        return this.store.getOne(id);
    }

    public async addToShoppingCart(productId: EntityId, quantity: number) {
        const [product, shoppingCartItem] = await Promise.all([
            this.productService.getProduct(productId),
            this.getShoppingCartItemByProductId(productId)
        ]);

        if (isNull(shoppingCartItem)) {
            return this.createShoppingCartItem(product, quantity);
        } else {
            await this.changeQuantity(
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                shoppingCartItem._id!,
                shoppingCartItem.quantity + quantity
            );
            return shoppingCartItem._id;
        }
    }

    public remove(id: EntityId) {
        return this.store.remove(id);
    }

    public emptyShoppingCart() {
        return this.store.removeAll();
    }

    public changeQuantity(id: EntityId, quantity: number) {
        return this.store.update(
            id,
            { quantity }
        );
    }

    private createShoppingCartItem(product: Product, quantity: number) {
        return this.store.insert({
            productName: product.productName,
            productDescription: product.productDescription,
            price: product.price,
            quantity: quantity,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            product: product._id!
        });
    }

    private async getShoppingCartItemByProductId(productId: EntityId) {
        const shoppingCartItems = await this.store.find({
            product: productId
        });
        return shoppingCartItems.length > 0 ? shoppingCartItems[0] : null;
    }
}

function getTotalPrice(shoppingCartItems: ShoppingCartItem[]) {
    return shoppingCartItems.reduce(
        (sum, item) => (sum + (item.price * item.quantity)),
        0
    );
}
