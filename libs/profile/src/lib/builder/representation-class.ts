import { namedNode } from '@rdfjs/data-model';
import { flatten, isEmpty } from 'lodash';
import { owl, rdf } from '../namespaces';
import { concept, Concept } from './concept';
import { toQuads } from './quad';
import { InstanceSchema, instanceSchema } from './schema';

export interface RepresentationClass extends Concept {
    schemas?: InstanceSchema[];
}

export const representationClass = (uri: string, definition: RepresentationClass) => [
    ...concept(uri, definition),
    ...getInstanceSchemaStatements(uri, definition),
    ...toQuads(
        [namedNode(uri), namedNode(rdf('type')), namedNode(owl('Class'))],
    )
];

function getInstanceSchemaStatements(uri: string, { schemas }: RepresentationClass) {
    if (isEmpty(schemas)) {
        return []
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return flatten(schemas!.map(
        schema => instanceSchema(uri, schema)
    ));
}
