import { Entity } from './entity.model';
import { NeDBStore } from './nedb.store';
import { Store } from './store.model';

export * from './entity.model';
export * from './store.model';

export function createStore<T extends Entity>(): Store<T> {
    return new NeDBStore<T>();
}

export async function createMockStore<T extends Entity>(entities: T[]): Promise<Store<T>> {
    const store = createStore<T>();
    await store.bulkInsert(entities);
    return store;
}

