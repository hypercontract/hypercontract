import { namedNode } from '@rdfjs/data-model';
import { owl, rdf } from '../namespaces';
import { concept, Concept } from './concept';
import { toQuads } from './quad';

export interface RepresentationClass extends Concept {}

export const representationClass = (uri: string, definition: RepresentationClass) => [
    ...concept(uri, definition),
    ...toQuads(
        [namedNode(uri), namedNode(rdf('type')), namedNode(owl('Class'))],
    )
];
