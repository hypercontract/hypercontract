import { literal, namedNode } from '@rdfjs/data-model';
import { rdfs } from '../namespaces';
import { toQuads } from './quad';

export interface Concept {
    label: string;
    description: string;
}

export const concept = (uri: string, { label, description }: Concept) => toQuads(
    [namedNode(uri), namedNode(rdfs('label')), literal(label)],
    [namedNode(uri), namedNode(rdfs('comment')), literal(description)]
);
