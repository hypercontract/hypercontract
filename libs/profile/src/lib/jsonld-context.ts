import { JsonLdContext } from './profile';

export const jsonLdContext: JsonLdContext = {
    'rdfs:domain': { '@type': '@id' },
    'rdfs:range': { '@type': '@id' },
    'hyper:valueSchema': { '@type': '@id' },
    'hyper:schemaDefinition': { '@type': '@id' },
    'hyper:expectedBody': { '@type': '@id' },
    'hyper:expectedQueryParams': { '@type': '@id' },
    'hyper:returnedType': { '@type': '@id' },
    'hyper:constraint': { '@type': '@id' },
};
