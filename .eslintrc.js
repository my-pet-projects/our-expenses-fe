module.exports = {
    env: {
        es6: true,
        jest: true,
        node: true,
        browser: true,
        serviceworker: true
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2021
    },
    extends: [
        'plugin:react/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended'
    ],
    plugins: ['react-hooks'],
    settings: {
        react: {
            version: 'detect'
        }
    },
    rules: {
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        '@typescript-eslint/explicit-function-return-type': ['error'],
        quotes: ['error', 'single'],
        'arrow-body-style': ['error', 'as-needed'],
        'no-undefined': 'error',
        'no-console': ['warn'],
        'prettier/prettier': ['warn']
    }
};
