import { getProductUri } from '../routing';
import { Product, SearchResults } from './product.model';

export function toJsonSearchResults(searchResults: SearchResults) {
    return {
        ...searchResults,
        products: searchResults.products.map(toJsonProduct)
    };
}

export function toJsonProduct(product: Product) {
    return {
        ...product,
        _id: getProductUri(product._id!)
    };
}
