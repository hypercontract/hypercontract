import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import tseslint from 'typescript-eslint';

const typescriptFiles = ['**/*.{ts,tsx}'];
const sourceFiles = ['**/*.{js,cjs,mjs,jsx,ts,tsx}'];

export default [
    { ignores: ['**/dist/**', 'coverage/**', 'out-tsc/**', 'tmp/**'] },
    eslint.configs.recommended,
    ...tseslint.configs.recommended.map(
        (config) => ({
            ...config,
            files: typescriptFiles,
        })
    ),
    {
        files: ['tools/**/*.cjs', 'postman/**/*.js'],
        languageOptions: {
            sourceType: 'commonjs',
            globals: { __dirname: 'readonly', process: 'readonly' },
        },
    },
    {
        files: typescriptFiles,
        rules: {
            '@typescript-eslint/adjacent-overload-signatures': 'error',
            '@typescript-eslint/no-empty-function': 'error',
            '@typescript-eslint/no-empty-object-type': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-inferrable-types': 'error',
            '@typescript-eslint/no-non-null-assertion': 'error',
            '@typescript-eslint/no-require-imports': 'off',
            '@typescript-eslint/no-use-before-define': [
                'error',
                { functions: false, classes: false },
            ],
            '@typescript-eslint/prefer-namespace-keyword': 'error',
            'no-empty-function': 'off',
        },
    },
    {
        files: sourceFiles,
        plugins: { '@stylistic': stylistic },
        rules: {
            '@stylistic/comma-spacing': 'error',
            '@stylistic/eol-last': 'error',
            '@stylistic/indent': ['error', 4, { SwitchCase: 1 }],
            '@stylistic/keyword-spacing': 'error',
            '@stylistic/no-extra-semi': 'error',
            '@stylistic/no-trailing-spaces': 'error',
            '@stylistic/object-curly-spacing': ['error', 'always'],
            '@stylistic/quotes': [
                'error',
                'single',
                { avoidEscape: true, allowTemplateLiterals: 'always' },
            ],
            '@stylistic/semi': ['error', 'always'],
            '@stylistic/space-infix-ops': 'error',
        },
    },
];
