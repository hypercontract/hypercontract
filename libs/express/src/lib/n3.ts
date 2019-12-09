import { Response } from 'express';
import { Writer } from 'n3';
import { NamedNode, Quad } from 'rdf-js';
import { Handler, Prefixes } from './handler';

export const n3 = (format: string): Handler => {
    return (response: Response, document: NamedNode, quads: Quad[], prefixes: Prefixes) => {
        const writer = new Writer(response, { prefixes, format });
        writer.addQuads(quads);
        writer.end((error, result) => console.log(result));
    };
}
