import { Response } from 'express';
import { JsonLdSerializer } from 'jsonld-streaming-serializer';
import { NamedNode, Quad } from 'rdf-js';
import { Handler, Prefixes } from './handler';

export const jsonld: Handler = (response: Response, document: NamedNode, quads: Quad[], prefixes: Prefixes) => {
    const serializer = new JsonLdSerializer({ context: prefixes });
    serializer.pipe(response);
    quads.forEach(quad => serializer.write(quad));
    serializer.end();
}
