import RDF from '@rdfjs/data-model';
import { hyper, owl, rdf } from '../namespaces';
import { descriptor, Descriptor } from './descriptor';
import { toQuads } from './quad';

export interface StateTransition extends Descriptor { }

export const stateTransition = (uri: string, definition: StateTransition) => [
    ...descriptor(uri, definition),
    ...toQuads(
        [RDF.namedNode(uri), RDF.namedNode(rdf('type')), RDF.namedNode(owl('ObjectProperty'))],
        [RDF.namedNode(uri), RDF.namedNode(rdf('type')), RDF.namedNode(hyper('StateTransition'))]
    )
];
