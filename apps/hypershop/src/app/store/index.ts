import { NeDBStore } from './nedb.store';
import { Store } from './store.model';

export * from './entity.model';
export * from './store.model';

export function createStore<T>(): Store<T> {
    return new NeDBStore<T>();
}

export function createMockStore<T>(entities: T[]): Promise<Store<T>> {
    const store = createStore<T>();
    return store.bulkInsert(entities)
        .then(() => store);
}

