import { RdfDocument } from '@hypercontract/profile';
import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { Writer } from 'n3';
import { Handler } from './handler';

function createN3Writer(format: string): Handler {
    return (
        response: Response,
        { prefixes, graph }: RdfDocument
    ) => {
        const writer = new Writer(response, { prefixes, format });
        writer.addQuads(graph);
        writer.end(error => {
            if (error) {
                response
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .send(error);
            }
        });
    };
}

export const toTurtle: Handler = createN3Writer('text/turtle');
export const toNTriples: Handler = createN3Writer('application/n-triples');
export const toNQuads: Handler = createN3Writer('application/n-quads');
export const toTriG: Handler = createN3Writer('application/trig');
