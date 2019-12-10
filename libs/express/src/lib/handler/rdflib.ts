import { RdfDocument } from '@hypercontract/profile';
import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { BlankNode, DefaultGraph, Literal, NamedNode, Quad, Variable } from 'rdf-js';
/* eslint-disable @typescript-eslint/ban-ts-ignore */
// @ts-ignore @types/rdflib contains invalid types
import { blankNode, defaultGraph, graph as rdfLibGraph, lit, namedNode, serialize, Statement, variable } from 'rdflib';
import { Handler } from './';

export const toRdfXml: Handler = (
    response: Response,
    { defaultNamespace, graph }: RdfDocument
) => {
    const store = rdfLibGraph();

    graph
        .map(quad => toRdfLibStatement(quad))
        // @ts-ignore @types/rdflib contains invalid types
        .forEach(statement => store.add(statement));

    // target, kb, base, contentType, callback, options
    serialize(undefined, store, defaultNamespace, 'application/rdf+xml', (error: any, document: string) => {
        if (error) {
            response
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send(error);
        }

        response.send(
            setBase(document, defaultNamespace)
        );
    });
}

function setBase(document: string, defaultNamespace: string): string {
    // TODO: parse XML, set xml:base and serialize
    return document.replace(
        '<rdf:RDF',
        `<rdf:RDF xml:base="${defaultNamespace}"`
    );
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
