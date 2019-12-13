import { ConceptClass, conceptClass, conceptProperty, ConceptProperty, EntryPoint, entryPoint, operation, Operation, Precondition, precondition, profileMeta, StateTransition, stateTransition } from '@hypercontract/profile';
import { shop } from './namespaces';
import { schemas } from './schemas';

export const shopSchemas = (name: string) => schemas.get(shop(name));

export const shopProfile = (profileUri: string, definition: EntryPoint) => profileMeta(
    profileUri,
    definition
);

export const shopEntryPoint = (entryPointUrl: string, type: string, definition: EntryPoint) => entryPoint(
    entryPointUrl,
    shop(type),
    definition
);

export const shopClass = (name: string, definition: ConceptClass) => conceptClass(
    shop(name),
    { ...definition, schemas: shopSchemas(name)
});

export const shopProperty = (name: string, definition: ConceptProperty) => conceptProperty(
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
