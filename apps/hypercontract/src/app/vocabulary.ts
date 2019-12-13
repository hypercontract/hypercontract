import { Cardinality, conceptClass, ConceptClass, conceptProperty, ConceptProperty, hyper, jsonLdContext, owl, prefixes, RdfDocument, rdfs, xsd } from '@hypercontract/profile';
import { flatten, trimEnd } from 'lodash';

const hyperClass = (name: string, definition: ConceptClass) => conceptClass(hyper(name), definition);
const hyperProperty = (name: string, definition: ConceptProperty) => conceptProperty(hyper(name), definition);

export const vocabulary: RdfDocument = {
    uri: trimEnd(hyper(''), '/'),
    defaultNamespace: hyper(''),
    prefixes,
    jsonLdContext,
    graph: flatten([
        hyperClass('Profile', {
            label: 'Profile',
            description: 'A profile describing a RESTful Web API using RDF and hypercontract.'
        }),
        hyperClass('EntryPoint', {
            label: 'Entry Point',
            description: 'Instances of this class serve as entry points to the API. The URI of the instance is also the URL of the resource.'
        }),
        hyperClass('StateTransition', {
            label: 'State Transition',
            description: 'A link relation type that describes a state transition. Unsafe state transitions must also be defined as an Operation.'
        }),
        hyperClass('Operation', {
            label: 'Operation',
            description: 'Either an unsafe state transition or a safe state transition that expects certain query params or has a returned type different from the rdfs:range value of the propery describing the state transition.'
        }),
        hyperProperty('method', {
            label: 'method',
            description: 'The HTTP method of the Operation request (e.g. POST).',
            domain: [hyper('Operation')],
            range: [xsd('string')]
        }),
        hyperProperty('returnedType', {
            label: 'returned type',
            description: 'The type of representation returned as a result of the Operation. When the Operation redirects to another resource, this type may differ from the rdfs:range value of the property describing the state transition.',
            domain: [hyper('Operation')],
            range: [rdfs('Class')],
            type: owl('ObjectProperty'),
            cardinality: Cardinality.OneOrMore
        }),
        hyperProperty('expectedBody', {
            label: 'expected body',
            description: 'The type of representation expected in the request body of the Operation request.',
            domain: [hyper('Operation')],
            range: [rdfs('Class')],
            type: owl('ObjectProperty'),
            cardinality: Cardinality.OneOrMore
        }),
        hyperProperty('expectedQueryParams', {
            label: 'expected query parameters',
            description: 'The type that describes the query parameters of the Operation request.',
            domain: [hyper('Operation')],
            range: [rdfs('Class')],
            type: owl('ObjectProperty'),
            cardinality: Cardinality.OneOrMore
        }),
        hyperProperty('constraint', {
            label: 'constraint',
            description: 'The constraints defined for the Operation.',
            domain: [hyper('Operation')],
            range: [hyper('Precondition')],
            cardinality: Cardinality.ZeroOrMore
        }),
        hyperClass('Precondition', {
            label: 'Precondition',
            description: 'A precondition that needs to be met before the Operation can be performed.'
        }),
        hyperProperty('instanceSchema', {
            label: 'instance schema',
            description: 'The Schemas that describe the serialization of a class instance.',
            domain: [rdfs('Class')],
            range: [hyper('Schema')],
            cardinality: Cardinality.ZeroOrMore
        }),
        hyperProperty('valueSchema', {
            label: 'value schema',
            description: 'The Schemas that describe the serialization of a property value.',
            domain: [rdfs('Property')],
            range: [hyper('Schema')],
            cardinality: Cardinality.ZeroOrMore
        }),
        hyperClass('Schema', {
            label: 'Schema',
            description: 'A schema that describes the serialization of a class instance or property value for a specified target format.'
        }),
        hyperProperty('schemaType', {
            label: 'schema type',
            description: 'The media type of the schema definition (e.g. application/schema+json).',
            domain: [hyper('Schema')],
            range: [xsd('string')]
        }),
        hyperProperty('targetType', {
            label: 'target type',
            description: 'The media type of the serialization that the Schema describes (e.g. application/json).',
            domain: [hyper('Schema')],
            range: [xsd('string')]
        })
    ])
};
