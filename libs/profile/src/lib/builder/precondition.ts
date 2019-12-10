import { namedNode } from '@rdfjs/data-model';
import { hyper, rdf } from '../namespaces';
import { concept, Concept } from './concept';
import { toQuads } from './quad';

export interface Precondition extends Concept {}

export const precondition = (uri: string, definition: Precondition) => [
    ...concept(uri, definition),
    ...toQuads(
        [namedNode(uri), namedNode(rdf('type')), namedNode(hyper('Precondition'))]
    )
];
