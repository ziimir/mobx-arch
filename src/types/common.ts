export type EmptyObject = Record<string, never>;

export type Awaited<T> = T extends PromiseLike<infer U> ? U : T

export type AnyPromiseFn = (...args: any[]) => Promise<any>;
