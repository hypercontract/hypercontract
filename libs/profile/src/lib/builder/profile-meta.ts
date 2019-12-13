import { namedNode } from '@rdfjs/data-model';
import { hyper, owl, rdf } from '../namespaces';
import { concept, Concept } from './concept';
import { toQuads } from './quad';

export interface ProfileMeta extends Concept {}

export const profileMeta = (uri: string, definition: ProfileMeta) => [
    ...concept(uri, definition),
    ...toQuads(
        [namedNode(uri), namedNode(rdf('type')), namedNode(owl('Class'))],
        [namedNode(uri), namedNode(rdf('type')), namedNode(hyper('Profile'))],
    )
];
