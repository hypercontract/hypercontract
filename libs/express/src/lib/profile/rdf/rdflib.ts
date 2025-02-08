import { RdfDocument } from '@hypercontract/profile';
import { Quad, Quad_Graph, Quad_Object, Quad_Predicate, Quad_Subject } from '@rdfjs/types';
import { Response } from 'express';
import { blankNode, defaultGraph, lit, namedNode, graph as rdfLibGraph, serialize, Statement, variable } from 'rdflib';
import { GraphType, ObjectType, PredicateType, SubjectType } from 'rdflib/lib/types';
import { handleInternalServerError } from '../../error';
import { Handler } from '../handler';

export const toRdfXml: Handler = (
    response: Response,
    { defaultNamespace, graph }: RdfDocument
) => {
    const store = rdfLibGraph();

    graph
        .map(quad => toRdfLibStatement(quad))
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore @types/rdflib contains invalid types
        .forEach(statement => store.add(statement));

    // target, kb, base, contentType, callback, options
    serialize(null, store, defaultNamespace, 'application/rdf+xml', (error: any, document: any) => {
        if (error) {
            handleInternalServerError(response);
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
        toSubjectType(quad.subject),
        toPredicateType(quad.predicate),
        toObjectType(quad.object),
        toGraphType(quad.graph)
    );
}

function toSubjectType(term: Quad_Subject): SubjectType {
    if (term.termType === 'BlankNode') {
        return blankNode(term.value);
    }
    if (term.termType === 'NamedNode') {
        return namedNode(term.value);
    }
    if (term.termType === 'Variable') {
        return variable(term.value);
    }

    throw new Error(`Unsupported term type: ${JSON.stringify(term)}`);
}

function toPredicateType(term: Quad_Predicate): PredicateType {
    if (term.termType === 'NamedNode') {
        return namedNode(term.value);
    }
    if (term.termType === 'Variable') {
        return variable(term.value);
    }

    throw new Error(`Unsupported term type: ${JSON.stringify(term)}`);
}

function toObjectType(term: Quad_Object): ObjectType {
    if (term.termType === 'BlankNode') {
        return blankNode(term.value);
    }
    if (term.termType === 'NamedNode') {
        return namedNode(term.value);
    }
    if (term.termType === 'Variable') {
        return variable(term.value);
    }
    if (term.termType === 'Literal') {
        return lit(term.value, term.language, namedNode(term.datatype.value));
    }

    throw new Error(`Unsupported term type: ${JSON.stringify(term)}`);
}

function toGraphType(term: Quad_Graph): GraphType {
    if (term.termType === 'NamedNode') {
        return namedNode(term.value);
    }
    if (term.termType === 'Variable') {
        return variable(term.value);
    }
    if (term.termType === 'DefaultGraph') {
        return defaultGraph();
    }

    throw new Error(`Unsupported term type: ${JSON.stringify(term)}`);
}