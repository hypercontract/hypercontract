import type { Config } from 'jest';

const preset: Config = {
    testEnvironment: 'node',
    moduleNameMapper: {
        '^@hypercontract/express$': '<rootDir>/../../libs/express/src/index.ts',
        '^@hypercontract/profile$': '<rootDir>/../../libs/profile/src/index.ts',
    },
    transform: {
        '^.+\\.tsx?$': [
            'ts-jest',
            { tsconfig: '<rootDir>/tsconfig.json' },
        ],
        '^.+\\.js$': '<rootDir>/../../tools/jest-transform-rdf.cjs',
    },
    transformIgnorePatterns: ['/node_modules/(?!@rdfjs/data-model/)'],
};

module.exports = preset;
