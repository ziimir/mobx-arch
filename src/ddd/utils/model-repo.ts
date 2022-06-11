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

type AnyPromiseFn = (...args: any[]) => Promise<any>;

export function createModelRepo<Fn extends AnyPromiseFn, Model>(
    fetchApi: Fn,
    build: (payload: Awaited<ReturnType<typeof fetchApi>>) => Model
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
