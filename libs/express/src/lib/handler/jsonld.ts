import { Response } from 'express';
import { JsonLdSerializer } from 'jsonld-streaming-serializer';
import { RdfDocument } from '../profile';
import { Handler } from './';

export const toJsonLd: Handler = (
    response: Response,
    { prefixes, graph }: RdfDocument
) => {
    const serializer = new JsonLdSerializer({ context: prefixes });
    serializer.pipe(response);
    graph.forEach(quad => serializer.write(quad));
    serializer.end();
}
