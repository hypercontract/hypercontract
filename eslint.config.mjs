import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

const sourceFiles = [
    'apps/*/src/**/*.{js,jsx,ts,tsx}',
    'libs/*/src/**/*.{js,jsx,ts,tsx}',
];

export default [
    ...[eslint.configs.recommended, ...tseslint.configs.recommended].map(
        (config) => ({
            ...config,
            files: sourceFiles,
        })
    ),
    {
        files: sourceFiles,
        rules: {
            '@typescript-eslint/adjacent-overload-signatures': 'error',
            '@typescript-eslint/no-empty-function': 'error',
            '@typescript-eslint/no-empty-object-type': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-inferrable-types': 'error',
            '@typescript-eslint/no-non-null-assertion': 'warn',
            '@typescript-eslint/no-require-imports': 'off',
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/no-use-before-define': [
                'error',
                { functions: false, classes: false },
            ],
            '@typescript-eslint/prefer-namespace-keyword': 'error',
            'no-empty-function': 'off',
            'no-extra-semi': 'error',
            quotes: [
                'error',
                'single',
                { avoidEscape: true, allowTemplateLiterals: true },
            ],
        },
    },
];
