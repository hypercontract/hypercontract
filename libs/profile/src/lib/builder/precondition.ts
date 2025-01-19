import RDF from '@rdfjs/data-model';
import { hyper, rdf } from '../namespaces';
import { concept, Concept } from './concept';
import { toQuads } from './quad';

export interface Precondition extends Concept { }

export const precondition = (uri: string, definition: Precondition) => [
    ...concept(uri, definition),
    ...toQuads(
        [RDF.namedNode(uri), RDF.namedNode(rdf('type')), RDF.namedNode(hyper('Precondition'))]
    )
];
