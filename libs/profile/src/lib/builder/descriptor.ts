import { namedNode } from '@rdfjs/data-model';
import { flatten, isEmpty, isUndefined } from 'lodash';
import { owl, rdf, rdfs } from '../namespaces';
import { Statement } from '../profile';
import { concept, Concept } from './concept';
import { toQuads } from './quad';
import { ValueSchema, valueSchema } from './schema';

export interface Descriptor extends Concept {
    domain: string[];
    range: string[];
    cardinality?: Cardinality;
    schemas?: ValueSchema[];
}

export enum Cardinality {
    One,
    OneOrMore,
    ZeroOrMore
}

export const descriptor = (uri: string, definition: Descriptor) => [
    ...concept(uri, definition),
    ...getValueSchemaStatements(uri, definition),
    ...toQuads(
        isOne(definition.cardinality) ? [namedNode(uri), namedNode(rdf('type')), namedNode(owl('FunctionalProperty'))] : null,
        ...getDomainStatements(uri, definition),
        ...getRangeStatements(uri, definition)
    )
];

function getValueSchemaStatements(uri: string, { schemas }: Descriptor) {
    if (isEmpty(schemas)) {
        return [];
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return flatten(schemas!.map(
        schema => valueSchema(uri, schema)
    ));
}

function getDomainStatements(uri: string, { domain }: Descriptor): Statement[] {
    return domain.map(
        domainUri => [namedNode(uri), namedNode(rdfs('domain')), namedNode(domainUri)]
    );
}

function getRangeStatements(uri: string, { range }: Descriptor): Statement[] {
    return range.map(
        rangeUri => [namedNode(uri), namedNode(rdfs('range')), namedNode(rangeUri)]
    );
}

function isOne(cardinality: Cardinality | undefined) {
    return isUndefined(cardinality) || cardinality === Cardinality.One;
}
