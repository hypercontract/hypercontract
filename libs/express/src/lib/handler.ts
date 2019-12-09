import { Response } from 'express';
import { NamedNode, Quad } from 'rdf-js';

export type Prefixes = {
    [key: string]: string
};

export type Handler = (response: Response, document: NamedNode, quads: Quad[], prefixes: Prefixes) => void;

export type HandlerMapping = {
    [key: string]: Handler
};
