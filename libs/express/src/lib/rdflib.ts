import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { BlankNode, DefaultGraph, Literal, NamedNode, Quad, Variable } from 'rdf-js';
// @ts-ignore @types/rdflib contains invalid types
import { blankNode, defaultGraph, graph as rdfLibGraph, lit, namedNode, serialize, Statement, variable } from 'rdflib';
import { Handler, Prefixes } from './handler';

export const rdfXml: Handler = (response: Response, document: NamedNode, quads: Quad[], prefixes: Prefixes) => {
    const store = rdfLibGraph();

    quads
        .map(quad => toRdfLibStatement(quad))
        // @ts-ignore @types/rdflib contains invalid types
        .forEach(statement => store.add(statement));

    // target, kb, base, contentType, callback, options
    serialize(undefined, store, document.value, 'application/rdf+xml', (error: any, rdfXml: string) => {
        if (error) {
            response
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send(error);
        }
        response.send(rdfXml);
    });
}

function toRdfLibStatement(quad: Quad) {
    return new Statement(
        toRdfLibTerm(quad.subject),
        toRdfLibTerm(quad.predicate),
        toRdfLibTerm(quad.object),
        toRdfLibTerm(quad.graph)
    );
}

function toRdfLibTerm(term: Variable | NamedNode | BlankNode | Literal | DefaultGraph) {
    if (term.termType === 'NamedNode') {
        return namedNode(term.value);
    }

    if (term.termType === 'BlankNode') {
        return blankNode(term.value);
    }

    if (term.termType === 'Literal') {
        return lit(term.value, term.language, namedNode(term.datatype.value));
    }

    if (term.termType === 'DefaultGraph') {
        return defaultGraph();
    }

    if (term.termType === 'Variable') {
        return variable(term.value);
    }

    console.warn(`Unknown term type: ${JSON.stringify(term)}`);
    return term;
}
