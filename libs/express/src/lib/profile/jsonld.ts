import { RdfDocument } from '@hypercontract/profile';
import { Response } from 'express';
import { compact, fromRDF } from 'jsonld';
import { Handler } from './handler';

export const toJsonLd: Handler = (
    response: Response,
    { prefixes, graph, jsonLdContext }: RdfDocument
) => {
    fromRDF(graph, {
        useNativeTypes: true
    })
        .then(document => compact(document, {
            ...prefixes,
            ...jsonLdContext
        }))
        .then(document => response.send(document));
}
