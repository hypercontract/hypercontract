import { Inject, Injectable } from '@nestjs/common';
import { defaultTo } from 'lodash';
import { EntityId, Store } from '../store';
import { Product, SearchResults } from './product.model';

export const PRODUCT_STORE = 'PRODUCT_STORE';

@Injectable()
export class ProductService {

    constructor(
        @Inject(PRODUCT_STORE) private store: Store<Product>,
    ) {}

    public async searchCatalog(queryString: string) {
        const products = await this.store.find(getQueryMatcher(queryString));
        return toSearchResults(products);
    }

    public getProduct(id: EntityId) {
        return this.store.getOne(id);
    }
}

function toSearchResults(products: Product[]): SearchResults {
    return {
        products,
        totalResults: products.length
    };
}

function getQueryMatcher(rawQuery: string) {
    const queryString = defaultTo(rawQuery, '').toLowerCase();

    return {
        $where: function (): boolean {
            return (
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                this['productName'].toLowerCase().indexOf(queryString) > -1 ||
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                this['productDescription'].toLowerCase().indexOf(queryString) > -1
            );
        }
    }
}
