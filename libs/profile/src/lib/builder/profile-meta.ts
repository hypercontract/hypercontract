import RDF from '@rdfjs/data-model';
import { hyper, owl, rdf } from '../namespaces';
import { concept, Concept } from './concept';
import { toQuads } from './quad';

export interface ProfileMeta extends Concept { }

export const profileMeta = (uri: string, definition: ProfileMeta) => [
    ...concept(uri, definition),
    ...toQuads(
        [RDF.namedNode(uri), RDF.namedNode(rdf('type')), RDF.namedNode(owl('Class'))],
        [RDF.namedNode(uri), RDF.namedNode(rdf('type')), RDF.namedNode(hyper('Profile'))],
    )
];
