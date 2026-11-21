import type { Config } from 'jest';

const config: Config = {
    projects: [
        '<rootDir>/apps/hypercontract/jest.config.ts',
        '<rootDir>/apps/hypershop/jest.config.ts',
        '<rootDir>/libs/express/jest.config.ts',
        '<rootDir>/libs/profile/jest.config.ts',
    ],
};

export default config;
