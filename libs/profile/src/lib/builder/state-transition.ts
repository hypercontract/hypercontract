import { namedNode } from '@rdfjs/data-model';
import { hyper, owl, rdf } from '../namespaces';
import { descriptor, Descriptor } from './descriptor';
import { toQuads } from './quad';

export interface StateTransition extends Descriptor { }

export const stateTransition = (uri: string, definition: StateTransition) => [
    ...descriptor(uri, definition),
    ...toQuads(
        [namedNode(uri), namedNode(rdf('type')), namedNode(owl('ObjectProperty'))],
        [namedNode(uri), namedNode(rdf('type')), namedNode(hyper('StateTransition'))]
    )
];
