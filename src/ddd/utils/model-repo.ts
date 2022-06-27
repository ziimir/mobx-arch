import {observable, runInAction, makeObservable} from 'mobx';

type Awaited<T> = T extends PromiseLike<infer U> ? U : T

type AnyPromiseFn = (...args: any[]) => Promise<any>;

export function createModelRepo<Fn extends AnyPromiseFn, Model>(
    fetchApi: Fn,
    build: (payload: Awaited<ReturnType<typeof fetchApi>>) => Model
) {
    type FetchArgs = Parameters<typeof fetchApi>;
    type FetchResult = Awaited<ReturnType<typeof fetchApi>>;

    return makeObservable({
        model: undefined as Model,
        fetch: function (...args: FetchArgs) {
            return fetchApi(...args)
                .then((data: FetchResult) => build(data))
                .then((m) => {
                    runInAction(() => {this.model = m});

                    return m;
                });
        },
        fetchWithCache: function (...args: FetchArgs) {
            return this.model ? Promise.resolve(this.model) : this.fetch(...args);
        }
    }, {model: observable.ref});
}
