import { namedNode } from '@rdfjs/data-model';
import { hyper, rdf } from '../namespaces';
import { toQuads } from './quad';
import { RepresentationClass, representationClass } from './representation-class';

export interface EntryPoint extends RepresentationClass {}

export const entryPoint = (uri: string, definition: EntryPoint) => [
    ...representationClass(uri, definition),
    ...toQuads(
        [namedNode(uri), namedNode(rdf('type')), namedNode(hyper('EntryPoint'))]
    )
];
