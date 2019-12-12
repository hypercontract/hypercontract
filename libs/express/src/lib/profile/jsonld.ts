import { RdfDocument } from '@hypercontract/profile';
import { Response } from 'express';
import { compact, fromRDF } from 'jsonld';
import { Handler } from './handler';

export const toJsonLd: Handler = async (
    response: Response,
    { prefixes, graph, jsonLdContext }: RdfDocument
) => {
    const document = await fromRDF(graph, {
        useNativeTypes: true
    });

    const compactedDocument = await compact(document, {
        ...prefixes,
        ...jsonLdContext
    });

    return response.send(compactedDocument);
}
