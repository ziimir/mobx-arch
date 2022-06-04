/* eslint-disable import/no-default-export */
declare module '*.pug' {
    const render: (args?: any) => string;
    export default render;
}
/* eslint-enable import/no-default-export */
