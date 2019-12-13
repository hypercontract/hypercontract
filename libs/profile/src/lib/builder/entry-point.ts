import { namedNode } from '@rdfjs/data-model';
import { hyper, rdf } from '../namespaces';
import { Concept } from './concept';
import { conceptClass } from './concept-class';
import { toQuads } from './quad';

export interface EntryPoint extends Concept {}

export const entryPoint = (uri: string, type: string, definition: EntryPoint) => [
    ...conceptClass(uri, definition),
    ...toQuads(
        [namedNode(uri), namedNode(rdf('type')), namedNode(hyper('EntryPoint'))],
        [namedNode(uri), namedNode(rdf('type')), namedNode(type)]
    )
];
