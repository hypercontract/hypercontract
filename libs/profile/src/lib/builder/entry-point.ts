import { namedNode } from '@rdfjs/data-model';
import { hyper, rdf } from '../namespaces';
import { Concept } from './concept';
import { toQuads } from './quad';
import { representationClass } from './representation-class';

export interface EntryPoint extends Concept {}

export const entryPoint = (uri: string, type: string, definition: EntryPoint) => [
    ...representationClass(uri, definition),
    ...toQuads(
        [namedNode(uri), namedNode(rdf('type')), namedNode(hyper('EntryPoint'))],
        [namedNode(uri), namedNode(rdf('type')), namedNode(type)]
    )
];
