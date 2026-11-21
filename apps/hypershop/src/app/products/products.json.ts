import { getProductUri } from '../routing';
import { Product, SearchResults } from './product.model';
import { requireEntityId } from '../store/entity.model';

export function toJsonSearchResults(searchResults: SearchResults) {
    return {
        ...searchResults,
        products: searchResults.products.map(toJsonProduct)
    };
}

export function toJsonProduct(product: Product) {
    return {
        ...product,
        _id: getProductUri(requireEntityId(product))
    };
}
