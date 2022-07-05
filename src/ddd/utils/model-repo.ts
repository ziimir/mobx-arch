import {observable, runInAction, makeObservable} from 'mobx';

import {Awaited, AnyPromiseFn} from '../../types/common';

export function createModelRepo<Fn extends AnyPromiseFn, Model>(
    fetchApi: Fn,
    build: (payload: Awaited<ReturnType<typeof fetchApi>>) => Model,
    invalidate: (model: Model, ...fetchArgs: Parameters<typeof fetchApi>) => boolean
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
            return (!this.model || invalidate(this.model, ...args)) ? this.fetch(...args) : Promise.resolve(this.model);
        }
    }, {model: observable.ref});
}
