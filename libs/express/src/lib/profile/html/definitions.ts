import { hyper, owl, ProfileStore, rdf, rdfs } from '@hypercontract/profile';
import { Quad } from '@rdfjs/types';
import { compact, fromRDF } from 'jsonld';
import { defaultTo, flatten, isArray, isNull, isUndefined, omitBy, without } from 'lodash';
import { dereferenceSchema } from '../../schema';

interface ConceptDefinition {
    uri: string;
    localName: string;
    description: string;
    definition: any;
    related: any[];
}

interface EntryPointDefinition extends ConceptDefinition {
    name: string;
    type: string[];
}

interface ClassDefinition extends ConceptDefinition {
    properties: PropertyDefinition[];
    stateTransitions: StateTransitionDefinition[];
    operations: OperationDefinition[];
    schemas: SchemaDefinition[];
}

interface PropertyDefinition extends ConceptDefinition {
    domain: Domain[];
    range: Range[];
    schemas: SchemaDefinition[];
}

interface StateTransitionDefinition extends ConceptDefinition {
    domain: Domain[];
    range: Range[];
    schemas: SchemaDefinition[];
}

interface OperationDefinition extends ConceptDefinition {
    domain: Domain[];
    range: Range[];
    method: string;
    expectedBody: string[];
    expectedQueryParams: string[];
    constraints: PreconditionDefinition[];
    returnedType: Range[];
    schemas: SchemaDefinition[];
}

interface PreconditionDefinition extends ConceptDefinition {
    appliesTo: string[];
}

interface SchemaDefinition extends ConceptDefinition {
    schemaType: string;
    targetType: string;
    schemaDefinition: string;
}

interface Range {
    localName: string;
    isSingleValue: boolean;
    isLocal: boolean;
}

interface Domain {
    localName: string;
    isLocal: boolean;
}


export async function getDefinitions(profileStore: ProfileStore) {
    const title = getTitle();
    const description = getDescription();
    const [
        entryPoints,
        representationClasses,
        representationProperties,
        stateTransitions,
        operations
    ] = await Promise.all([
        getEntryPoints(),
        getRepresentationClasses(),
        getRepresentationProperties(),
        getStateTransitions(),
        getOperations()
    ]);

    return {
        title,
        description,
        entryPoints,
        representationClasses,
        representationProperties,
        stateTransitions,
        operations
    };

    function getTitle() {
        return defaultTo(
            profileStore.getObject(profileStore.profileUri, rdfs('label')),
            'Profile Documentation'
        );
    }

    function getDescription() {
        return profileStore.getObject(profileStore.profileUri, rdfs('comment'));
    }

    async function getEntryPoints(): Promise<EntryPointDefinition[]> {
        const conceptDefinitions = await getConceptDefinitions(null, rdf('type'), hyper('EntryPoint'));
        return Promise.all(
            conceptDefinitions.map(async definition => {
                return {
                    ...definition,
                    name: definition.definition['rdfs:label'],
                    type: getEntryPointType(definition)
                };
            })
        );
    }

    async function getRepresentationClasses(): Promise<ClassDefinition[]> {
        const conceptDefinitions = await Promise.all([
            getConceptDefinitions(null, rdf('type'), owl('Class')),
            getConceptDefinitions(null, rdf('type'), rdf('Class'))
        ]);
        return Promise.all(
            flatten(conceptDefinitions)
                .filter(definition => isRepresentationClass(definition))
                .map(async definition => {
                    const properties = await getPropertiesForClass(definition.uri);
                    const stateTransitions = await getStateTransitionsForClass(definition.uri);
                    const operations = await getOperationsForClass(definition.uri);
                    const schemas = await getInstanceSchemasFor(definition.uri);
                    return {
                        ...definition,
                        properties,
                        stateTransitions,
                        operations,
                        schemas
                    };
                })
        );
    }

    async function getRepresentationProperties(): Promise<PropertyDefinition[]> {
        const conceptDefinitions = await Promise.all([
            getConceptDefinitions(null, rdf('type'), owl('DatatypeProperty')),
            getConceptDefinitions(null, rdf('type'), owl('ObjectProperty')),
            getConceptDefinitions(null, rdf('type'), rdf('Property'))
        ]);
        return Promise.all(toPropertyDefinitions(flatten(conceptDefinitions)));
    }

    async function getPropertiesForClass(classUri: string): Promise<PropertyDefinition[]> {
        const conceptDefinitions = await getConceptDefinitions(null, rdfs('domain'), classUri)
        return Promise.all(toPropertyDefinitions(conceptDefinitions));
    }

    function toPropertyDefinitions(conceptDefinitions: ConceptDefinition[]): Promise<PropertyDefinition>[] {
        return conceptDefinitions
            .filter(definition => !getTypes(definition).includes('hyper:StateTransition'))
            .map(async definition => {
                const schemas = await getValueSchemasFor(definition.uri);
                return {
                    ...definition,
                    domain: getDomain(definition),
                    range: getRange(definition),
                    schemas
                };
            });
    }


    async function getStateTransitions(): Promise<StateTransitionDefinition[]> {
        const conceptDefinitions = await getConceptDefinitions(null, rdf('type'), hyper('StateTransition'));
        return Promise.all(toStateTransitionDefinitions(conceptDefinitions));
    }

    async function getStateTransitionsForClass(classUri: string): Promise<StateTransitionDefinition[]> {
        const conceptDefinitions = await getConceptDefinitions(null, rdfs('domain'), classUri)
        return Promise.all(toStateTransitionDefinitions(conceptDefinitions));
    }

    function toStateTransitionDefinitions(conceptDefinitions: ConceptDefinition[]): Promise<StateTransitionDefinition>[] {
        return conceptDefinitions
            .filter(definition => (
                getTypes(definition).includes('hyper:StateTransition') &&
                !getTypes(definition).includes('hyper:Operation')
            ))
            .map(async definition => {
                const schemas = await getValueSchemasFor(definition.uri);
                return {
                    ...definition,
                    domain: getDomain(definition),
                    range: getRange(definition),
                    schemas
                }
            });
    }

    async function getOperations(): Promise<OperationDefinition[]> {
        const conceptDefinitions = await getConceptDefinitions(null, rdf('type'), hyper('Operation'))
        return Promise.all(toOperationDefinitions(conceptDefinitions));
    }

    async function getOperationsForClass(classUri: string): Promise<OperationDefinition[]> {
        const conceptDefinitions = await getConceptDefinitions(null, rdfs('domain'), classUri)
        return Promise.all(toOperationDefinitions(conceptDefinitions));
    }

    function toOperationDefinitions(conceptDefinitions: ConceptDefinition[]): Promise<OperationDefinition>[] {
        return conceptDefinitions
            .filter(definition => (getTypes(definition).includes('hyper:Operation')))
            .map(async definition => {
                const constraints = await getPreconditionsForClass(definition.uri);
                const schemas = await getValueSchemasFor(definition.uri);
                return {
                    ...definition,
                    domain: getDomain(definition),
                    range: getRange(definition),
                    returnedType: getReturnedType(definition),
                    method: definition.definition['hyper:method'],
                    expectedBody: getExpectedBody(definition),
                    expectedQueryParams: getExpectedQueryParams(definition),
                    constraints,
                    schemas
                };
            });
    }

    async function getPreconditionsForClass(classUri: string): Promise<PreconditionDefinition[]> {
        const conceptDefinitions = await getConceptDefinitions(classUri, hyper('constraint'), null)
        return toPreconditionDefinitions(conceptDefinitions);
    }

    function toPreconditionDefinitions(conceptDefinitions: ConceptDefinition[]): PreconditionDefinition[] {
        return conceptDefinitions
            .filter(definition => (getTypes(definition).includes('hyper:Precondition')))
            .map(definition => ({
                ...definition,
                appliesTo: []
            }));
    }

    function getExpectedBody(conceptDefinition: ConceptDefinition) {
        const expectedBody = conceptDefinition.definition['hyper:expectedBody'];

        if (isUndefined(expectedBody)) {
            return [];
        }

        return isArray(expectedBody) ? expectedBody : [expectedBody];
    }

    function getExpectedQueryParams(conceptDefinition: ConceptDefinition) {
        const expectedQueryParams = conceptDefinition.definition['hyper:expectedQueryParams'];

        if (isUndefined(expectedQueryParams)) {
            return [];
        }

        return isArray(expectedQueryParams) ? expectedQueryParams : [expectedQueryParams];
    }

    function getEntryPointType(conceptDefinition: ConceptDefinition): string[] {
        return getTypes(conceptDefinition)
            .filter(type => type.startsWith(profileStore.defaultNamespace))
            .map(uri => localName(uri))
    }

    function getDomain(conceptDefinition: ConceptDefinition): Domain[] {
        const domain = defaultTo(conceptDefinition.definition['rdfs:domain'], []);
        const domains = isArray(domain) ? domain : [domain];
        return domains.map(
            domain => ({
                localName: domain,
                isLocal: isLocal(domain)
            })
        );
    }

    function getRange(conceptDefinition: ConceptDefinition): Range[] {
        const range = defaultTo(conceptDefinition.definition['rdfs:range'], []);
        const ranges = isArray(range) ? range : [range];
        return ranges.map(
            range => ({
                localName: range,
                isLocal: isLocal(range),
                isSingleValue: getTypes(conceptDefinition).includes('owl:FunctionalProperty')
            })
        );
    }

    function getReturnedType(conceptDefinition: ConceptDefinition): Range[] {
        const returnedType = defaultTo(conceptDefinition.definition['hyper:returnedType'], []);
        const returnedTypes = isArray(returnedType) ? returnedType : [returnedType];
        return returnedTypes.map(
            returnedType => ({
                localName: returnedType,
                isLocal: isLocal(returnedType),
                isSingleValue: true
            })
        );
    }

    function getTypes(conceptDefinition: ConceptDefinition): string[] {
        const type = defaultTo(conceptDefinition.definition['@type'], []);
        return isArray(type) ? type : [type];
    }

    function isRepresentationClass(classDefinition: ConceptDefinition) {
        return classDefinition.uri.startsWith(profileStore.defaultNamespace);
    }

    async function getInstanceSchemasFor(uri: string) {
        return getSchemasFor(uri, 'instanceSchema');
    }

    async function getValueSchemasFor(uri: string) {
        return getSchemasFor(uri, 'valueSchema');
    }

    async function getAllSchemas() {
        const conceptDefinitions = await getConceptDefinitions(null, rdf('type'), hyper('Schema'));
        return conceptDefinitions.reduce(
            (schemas, definition) => ({
                ...schemas,
                [definition.uri]: definition.definition['rdf:value']
            }),
            {}
        );
    }

    async function getSchemasFor(uri: string, type: 'instanceSchema' | 'valueSchema') {
        const conceptDefinitions = await getConceptDefinitions(uri, hyper(type), null);
        return Promise.all(toSchemas(conceptDefinitions));
    }

    function toSchemas(conceptDefinitions: ConceptDefinition[]): Promise<SchemaDefinition>[] {
        return conceptDefinitions
            .map(async definition => {
                const schemaType = definition.definition['hyper:schemaType'];
                const targetType = definition.definition['hyper:targetType'];
                const schemaDefinition = definition.definition['rdf:value'];
                const dereferencedSchemaDefinition = await dereferenceSchema(schemaDefinition, schemaType, profileStore);
                return {
                    ...definition,
                    schemaType,
                    targetType,
                    schemaDefinition: dereferencedSchemaDefinition
                };
            });
    }

    async function getConceptDefinitions(subject: string | null, predicate: string, object: string | null): Promise<ConceptDefinition[]> {
        let concepts: string[];

        if (isNull(subject)) {
            concepts = profileStore.getSubjects(predicate, object!)
        }

        if (isNull(object)) {
            concepts = profileStore.getObjects(subject!, predicate)
        }

        if (isUndefined(concepts!)) {
            throw new Error('Neither subject nor object provided');
        }

        const conceptDefinitions = await Promise.all(
            concepts.map(async uri => {
                const quads = profileStore.getAllAbout(uri);
                const jsonLdDocument: any = await toJsonLd(quads, profileStore);
                const graph = jsonLdDocument['@graph'];
                const definition = isUndefined(graph) ? jsonLdDocument : getConceptDefinitionFromGraph(uri, graph);
                const related = isUndefined(graph) ? [] : without(graph, definition);
                return {
                    uri,
                    localName: localName(uri),
                    description: definition['rdfs:comment'],
                    definition,
                    related
                }
            })
        );
        return conceptDefinitions
            .sort(compareConceptDefintions)
    }

    function compareConceptDefintions({ localName: nameLeft }: ConceptDefinition, { localName: nameRight }: ConceptDefinition) {
        if (nameLeft < nameRight) {
            return -1;
        }
        if (nameLeft > nameRight) {
            return 1;
        }
        return 0;
    }

    function getConceptDefinitionFromGraph(uri: string, graph: any[]) {
        return graph.find(concept => concept['@id'] === localName(uri));
    }

    async function toJsonLd(quads: Quad[], { defaultNamespace, prefixes, jsonLdContext }: ProfileStore) {
        const document = await fromRDF(quads, {
            useNativeTypes: true
        });

        return compact(document, {
            ...omitBy(prefixes, value => value === defaultNamespace),
            ...jsonLdContext,
            '@base': defaultNamespace
        });
    }

    // EntryPoints
    // Preconditions

    // Properties
    // StateTransitions
    // Operations

    function isLocal(name: string) {
        return name.includes(':');
    }

    function localName(uri: string) {
        return uri.replace(profileStore.defaultNamespace, '');
    }

}
