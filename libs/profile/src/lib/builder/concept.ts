import RDF from '@rdfjs/data-model';
import { rdfs } from '../namespaces';
import { toQuads } from './quad';

export interface Concept {
    label: string;
    description: string;
}

export const concept = (uri: string, { label, description }: Concept) => toQuads(
    [RDF.namedNode(uri), RDF.namedNode(rdfs('label')), RDF.literal(label)],
    [RDF.namedNode(uri), RDF.namedNode(rdfs('comment')), RDF.literal(description)]
);
