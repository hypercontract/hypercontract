import { literal, namedNode } from '@rdfjs/data-model';
import { hyper, rdf } from '../../namespaces';
import { Statement } from '../../profile';
import { toQuads } from '../quad';

export interface Schema {
    schemaType: string;
    targetTypes: string[];
    fileExtension: string;
    schemaDefinition: string;
}

export const schema = (uri: string, schemaRelation: string, definition: Schema) => {
    const schemaUri = getSchemaUri(uri, definition);
    const schemaDefinitionUri = getSchemaDefinitionUri(uri, definition);
    return toQuads(
        [namedNode(uri), namedNode(schemaRelation), namedNode(schemaUri)],
        [namedNode(schemaUri), namedNode(rdf('type')), namedNode(hyper('Schema'))],
        ...getTargetTypeStatements(schemaUri, definition),
        [namedNode(schemaUri), namedNode(hyper('schemaType')), literal(definition.schemaType)],
        [namedNode(schemaUri), namedNode(hyper('schemaDefinition')), namedNode(schemaDefinitionUri)],
        [namedNode(schemaDefinitionUri), namedNode(rdf('value')), literal(definition.schemaDefinition)],
    );
};

function getTargetTypeStatements(schemaUri: string, { targetTypes }: Schema): Statement[] {
    return targetTypes.map(
        targetType => [namedNode(schemaUri), namedNode(hyper('targetType')), literal(targetType)]
    );
}

function getSchemaUri(conceptUri: string, { schemaType }: Schema) {
    return `${conceptUri}/schema/${schemaType}`;
}

function getSchemaDefinitionUri(conceptUri: string, { fileExtension }: Schema) {
    return `${conceptUri}/schema.${fileExtension}`;
}
