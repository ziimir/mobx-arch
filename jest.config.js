module.exports = {
    // js-with-babel-esm т.к. у нас сначала tsc билдит код в ESNext, а потом babel билдит его уже в commonJs
    preset: 'ts-jest/presets/js-with-babel-esm',
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.json',
            babelConfig: '<rootDir>/babel.config.js'
        }
    },
    testPathIgnorePatterns: [
        '<rootDir>/out/',
        '<rootDir>/node_modules/'
    ]
};
