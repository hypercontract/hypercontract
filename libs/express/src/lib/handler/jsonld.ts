import { Response } from 'express';
import { compact, fromRDF } from 'jsonld';
import { RdfDocument } from '../profile';
import { Handler } from './';

export const toJsonLd: Handler = (
    response: Response,
    { defaultNamespace, uri, prefixes, graph }: RdfDocument
) => {
    fromRDF(graph, {
        useNativeTypes: true
    })
        .then(document => compact(document, {
            ...prefixes,
            'rdfs:domain': {
                // '@id': 'rdfs:domain',
                '@type': '@id'
            },
            'rdfs:range': {
                // '@id': 'rdfs:range',
                '@type': '@id'
            }
        }))
        .then(document => response.send(document));
}
