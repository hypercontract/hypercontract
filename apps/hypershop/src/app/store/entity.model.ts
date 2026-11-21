export type EntityId = string;

export interface Entity {
    _id?: EntityId;
}

export function requireEntityId(entity: Entity): EntityId {
    if (entity._id === undefined) {
        throw new Error('Expected an entity with an ID');
    }

    return entity._id;
}
