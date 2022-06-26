import {makeObservable, computed} from 'mobx';

export function unwrapDeps<T extends Record<string, {model: any}>>(repoDeps: T) {
    type Res<Type> = {
        [Property in keyof Type]: Type[Property] extends {model: infer R} ? R : never
    }

    const deps = Object.keys(repoDeps).reduce((deps, key) => {
        Object.defineProperty(deps, key, {get: function () {return repoDeps[key].model}});
        return deps;
    }, {} as Res<typeof repoDeps>);

    const depsAnnotations = Object.keys(deps).reduce((depsAnnotations, key) => {
        depsAnnotations[key] = computed;
        return depsAnnotations;
    }, {});

    return makeObservable(deps, depsAnnotations);
}
