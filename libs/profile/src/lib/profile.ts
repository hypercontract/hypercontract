import { Quad, Quad_Object as QuadObject, Quad_Predicate as QuadPredicate, Quad_Subject as QuadSubject } from 'rdf-js';

export type Prefixes = {
    [key: string]: string;
};

export interface Profile extends RdfDocument {}

export interface RdfDocument {
    uri: string;
    defaultNamespace: string;
    prefixes: Prefixes;
    graph: Quad[];
}

export type Statement = [QuadSubject, QuadPredicate, QuadObject];
