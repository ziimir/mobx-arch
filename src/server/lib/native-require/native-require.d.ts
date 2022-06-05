type NativeRequire = <T>(path: string) => T;

declare const nativeRequire: NativeRequire;
export default nativeRequire;
