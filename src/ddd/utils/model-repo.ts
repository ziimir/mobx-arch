import {
    observable,
    runInAction,
    makeObservable,
    action,
    computed
} from 'mobx';

class ModelContainer<T> {
    v: T | undefined = undefined;

    constructor() {
        makeObservable(this, {
            v: observable.ref,
            value: computed,
            set: action
        });

        this.v = undefined;
    }

    get value() {
        return this.v;
    }

    set(value: T) {
        this.v = value;
    }
}

type Awaited<T> = T extends PromiseLike<infer U> ? U : T

type IsValidArg<T> = T extends object ? keyof T extends never ? false : true : true;

/* eslint-disable max-len */
// https://stackoverflow.com/questions/50773038/inferring-function-parameters-in-typescript
type Promisified<T extends (...args: any[]) => any> =
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
/* eslint-enable max-len */

type AnyPromiseFn = (...args: any[]) => Promise<any>;

export function createModelRepo<Fn extends AnyPromiseFn, Model>(
    fetchApi: Promisified<Fn>,
    build: (...args: Awaited<ReturnType<typeof fetchApi>>[]) => Model
) {
    type FetchArgs = Parameters<typeof fetchApi>;
    type FetchResult = Awaited<ReturnType<typeof fetchApi>>;

    const model = new ModelContainer<Model>();

    return {
        get: () => model.value,
        fetch: (...args: FetchArgs) => fetchApi(...args)
            .then((data: FetchResult) => build(data))
            .then((m) => {
                runInAction(() => {model.set(m);});
                return m;
            })
    };
}
