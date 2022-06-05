module.exports = {
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
