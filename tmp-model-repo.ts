abstract class ModelRepo<T> {
    // last fetch query for refresh
    prevFetchQuery: any;

    // observable.ref
    model: T | undefined;

    // synchronously get model from memory
    abstract get(): T;

    // fetch model data, create Model and store it in ModelRepo
    abstract fetch(): Promise<T>;

    // fetch model data, create Model and store it in ModelRepo
    abstract refresh(): Promise<T>;
}
