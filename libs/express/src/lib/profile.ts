import { Quad } from 'rdf-js';
import { Prefixes } from './handler';

export interface Profile extends RdfDocument {}

export interface RdfDocument {
    uri: string;
    defaultNamespace: string;
    prefixes: Prefixes;
    graph: Quad[];
}
