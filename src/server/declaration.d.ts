declare module '*.pug' {
    const render: (args?: any) => string;
    export default render;
};
