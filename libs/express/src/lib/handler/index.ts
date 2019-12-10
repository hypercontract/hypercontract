import { RdfDocument } from '@hypercontract/profile';
import { Response } from 'express';

export { toJsonLd } from './jsonld';
export { toNQuads, toNTriples, toTriG, toTurtle } from './n3';
export { toRdfXml } from './rdflib';

export type Handler = (response: Response, rdfDocument: RdfDocument) => void;

export type HandlerMapping = {
    [key: string]: Handler;
};
