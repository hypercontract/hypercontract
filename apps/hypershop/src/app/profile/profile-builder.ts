import { EntryPoint, entryPoint, operation, Operation, Precondition, precondition, RepresentationClass, representationClass, representationProperty, RepresentationProperty, StateTransition, stateTransition } from '@hypercontract/profile';
import { shop } from './namespaces';
import { schemas } from './schemas';

export const shopSchemas = (name: string) => schemas.get(shop(name));

export const shopEntryPoint = (entryPointUrl: string, type: string, definition: EntryPoint) => entryPoint(
    entryPointUrl,
    shop(type),
    definition
);

export const shopClass = (name: string, definition: RepresentationClass) => representationClass(
    shop(name),
    { ...definition, schemas: shopSchemas(name)
});

export const shopProperty = (name: string, definition: RepresentationProperty) => representationProperty(
    shop(name),
    { ...definition, schemas: shopSchemas(name)
});

export const shopStateTransition = (name: string, definition: StateTransition) => stateTransition(
    shop(name),
    { ...definition, schemas: shopSchemas(name)
});

export const shopOperation = (name: string, definition: Operation) => operation(
    shop(name),
    { ...definition, schemas: shopSchemas(name)
});

export const shopPrecondition = (name: string, definition: Precondition) => precondition(shop(name), definition);
