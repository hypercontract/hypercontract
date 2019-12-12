import { Inject, Injectable } from '@nestjs/common';
import { defaultTo } from 'lodash';
import { EntityId, Store } from '../store';
import { Product } from './product.model';

export const PRODUCT_STORE = 'PRODUCT_STORE';

@Injectable()
export class ProductService {

    constructor(
        @Inject(PRODUCT_STORE) private store: Store<Product>,
    ) {}

    public findProducts(query: string) {
        return this.store.find(getQueryMatcher(query));
    }

    public getProduct(id: EntityId) {
        return this.store.getOne(id);
    }
}

function getQueryMatcher(rawQuery: string) {
    const query = defaultTo(rawQuery, '').toLowerCase();

    return {
        $where: function (): boolean {
            return (
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                this['name'].toLowerCase().indexOf(query) > -1 ||
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                this['description'].toLowerCase().indexOf(query) > -1
            );
        }
    }
}
