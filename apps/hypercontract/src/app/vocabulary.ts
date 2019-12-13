import { concept, Concept, hyper, jsonLdContext, prefixes, RdfDocument } from '@hypercontract/profile';
import { flatten, trimEnd } from 'lodash';

const hyperConcept = (name: string, definition: Concept) => concept(hyper(name), definition);

export const vocabulary: RdfDocument = {
    uri: trimEnd(hyper(''), '/'),
    defaultNamespace: hyper(''),
    prefixes,
    jsonLdContext,
    graph: flatten([
        hyperConcept('schemaType', {
            label: 'schemaType',
            description: 'schemaType schemaType schemaType'
        }),
        hyperConcept('EntryPoint', {
            label: 'EntryPoint',
            description: 'EntryPoint EntryPoint EntryPoint'
        }),
        hyperConcept('Operation', {
            label: 'Operation',
            description: 'Operation Operation Operation'
        }),
        hyperConcept('method', {
            label: 'method',
            description: 'method method method'
        }),
        hyperConcept('returnedType', {
            label: 'returnedType',
            description: 'returnedType returnedType returnedType'
        }),
        hyperConcept('expectedBody', {
            label: 'expectedBody',
            description: 'expectedBody expectedBody expectedBody'
        }),
        hyperConcept('expectedQueryParams', {
            label: 'expectedQueryParams',
            description: 'expectedQueryParams expectedQueryParams expectedQueryParams'
        }),
        hyperConcept('constraint', {
            label: 'constraint',
            description: 'constraint constraint constraint'
        }),
        hyperConcept('Precondition', {
            label: 'Precondition',
            description: 'Precondition Precondition Precondition'
        }),
        hyperConcept('instanceSchema', {
            label: 'instanceSchema',
            description: 'instanceSchema instanceSchema instanceSchema'
        }),
        hyperConcept('Schema', {
            label: 'Schema',
            description: 'Schema Schema Schema'
        }),
        hyperConcept('targetType', {
            label: 'targetType',
            description: 'targetType targetType targetType'
        }),
        hyperConcept('valueSchema', {
            label: 'valueSchema',
            description: 'valueSchema valueSchema valueSchema'
        })
    ])
};
