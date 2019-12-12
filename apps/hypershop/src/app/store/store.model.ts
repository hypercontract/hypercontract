import { Entity, EntityId } from './entity.model';

export interface Store<T extends Entity> {
    getOne(entityId: EntityId): Promise<T>;
    findOne(entityId: EntityId): Promise<T | null>;
    find(query?: any): Promise<T[]>;
    insert(entity: T): Promise<EntityId>;
    bulkInsert(entities: T[]): Promise<EntityId[]>;
    update(entityId: EntityId, updatedEntity: Partial<T>): Promise<void>;
    remove(entityId: EntityId): Promise<void>;
    removeAll(): Promise<void>;
}
