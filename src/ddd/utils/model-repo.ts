import {observable, runInAction, makeObservable, action, computed} from 'mobx';

type Awaited<T> = T extends PromiseLike<infer U> ? U : T

type IsValidArg<T> = T extends object ? keyof T extends never ? false : true : true;

// https://stackoverflow.com/questions/50773038/inferring-function-parameters-in-typescript
type Promisified<T extends Function> =
    T extends (...args: any[]) => Promise<any> ? T : (
        T extends (a: infer A, b: infer B, c: infer C, d: infer D, e: infer E, f: infer F, g: infer G, h: infer H, i: infer I, j: infer J) => infer R ? (
            IsValidArg<J> extends true ? (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J) => Promise<R> :
            IsValidArg<I> extends true ? (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I) => Promise<R> :
            IsValidArg<H> extends true ? (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H) => Promise<R> :
            IsValidArg<G> extends true ? (a: A, b: B, c: C, d: D, e: E, f: F, g: G) => Promise<R> :
            IsValidArg<F> extends true ? (a: A, b: B, c: C, d: D, e: E, f: F) => Promise<R> :
            IsValidArg<E> extends true ? (a: A, b: B, c: C, d: D, e: E) => Promise<R> :
            IsValidArg<D> extends true ? (a: A, b: B, c: C, d: D) => Promise<R> :
            IsValidArg<C> extends true ? (a: A, b: B, c: C) => Promise<R> :
            IsValidArg<B> extends true ? (a: A, b: B) => Promise<R> :
            IsValidArg<A> extends true ? (a: A) => Promise<R> :
            () => Promise<R>
        ) : never
    );

export function createModelRepo<Fn extends (...args: any[]) => Promise<any>, Model>(
    fetchApi: Promisified<Fn>,
    build: (...args: Awaited<ReturnType<typeof fetchApi>>[]) => Model
) {
    type FetchArgs = Parameters<typeof fetchApi>;
    type FetchResult = Awaited<ReturnType<typeof fetchApi>>;

    let model = new ModelContainer<Model>();

    return {
        get: () => model.value,
        fetch: (...args: FetchArgs) => fetchApi(...args)
            .then((data: FetchResult) => build(data))
            .then((m) => {
                runInAction(() => {model.set(m)});
                return m;
            })
    };
};

class ModelContainer<T> {
    _value: T | undefined = undefined;

    constructor() {
        makeObservable(this, {
            _value: observable.ref,
            value: computed,
            set: action
        });

        this._value = undefined;
    }

    get value() {
        return this._value;
    }

    set(value: T) {
        this._value = value;
    }
}
