const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');
const nxEslintPlugin = require('@nx/eslint-plugin');

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
});

module.exports = [
    { plugins: { '@nx': nxEslintPlugin } },
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
        rules: {
            // '@nx/enforce-module-boundaries': [
            //     'error',
            //     {
            //         enforceBuildableLibDependency: true,
            //         allow: [],
            //         depConstraints: [
            //             {
            //                 sourceTag: '*',
            //                 onlyDependOnLibsWithTags: ['*'],
            //             },
            //         ],
            //     },
            // ],
        },
    },
    ...compat
        .config({
            plugins: ['simple-import-sort'],
            extends: ['plugin:@nx/typescript', 'prettier'],
        })
        .map((config) => ({
            ...config,
            files: ['**/*.ts', '**/*.tsx'],
            rules: {
                ...config.rules,
                '@typescript-eslint/no-explicit-any': 'off',
                // '@typescript-eslint/ban-types': [
                //     'error',
                //     {
                //         types: { Function: false },
                //         extendDefaults: true,
                //     },
                // ],
                'max-len': 'off',
                'no-empty': ['error', { allowEmptyCatch: true }],
                'simple-import-sort/imports': ['warn', { groups: [['^@angular', '^@angular/material'], ['^(?!@/|\\.)'], ['^\\.\\.'], ['^\\.']] }],
                'simple-import-sort/exports': ['warn'],
            },
            // languageOptions: { parserOptions: { project: './tsconfig.*?.json' } },
        })),
    ...compat
        .config({
            extends: ['plugin:@nx/javascript', 'prettier'],
            env: { node: true },
        })
        .map((config) => ({
            ...config,
            files: ['**/*.js', '**/*.jsx'],
            rules: {
                ...config.rules,
                '@typescript-eslint/no-var-requires': 'off',
            },
        })),
];
