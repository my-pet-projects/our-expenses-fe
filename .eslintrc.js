module.exports = {
    env: {
        es6: true,
        jest: true,
        node: true,
        browser: true,
        commonjs: true,
        serviceworker: true
    },
    parser: '@typescript-eslint/parser',
    extends: ['plugin:react/recommended', 'plugin:@typescript-eslint/recommended'],
    plugins: ['react-hooks', 'prefer-arrow'],
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2020,
        ecmaFeatures: {
            jsx: true
        }
    },
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
        semi: ['error', 'always'],
        quotes: ['error', 'single'],
        'no-multiple-empty-lines': [
            'error',
            {
                max: 1,
                maxEOF: 0,
                maxBOF: 0
            }
        ],
        'eol-last': ['error', 'always'],
        'max-classes-per-file': ['error', 1],
        'arrow-body-style': ['error', 'as-needed'],
        'no-undefined': 'error',
        'no-console': ['warn'],
        '@typescript-eslint/explicit-function-return-type': 'error',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/typedef': [
            'error',
            {
                arrayDestructuring: false,
                objectDestructuring: false,
                arrowParameter: true,
                parameter: true,
                memberVariableDeclaration: true,
                propertyDeclaration: true,
                variableDeclaration: false
            }
        ],
        // '@typescript-eslint/member-ordering': 'error',
        '@typescript-eslint/explicit-member-accessibility': [
            'error',
            {
                accessibility: 'explicit',
                overrides: {
                    accessors: 'explicit',
                    constructors: 'no-public',
                    methods: 'explicit',
                    properties: 'explicit',
                    parameterProperties: 'explicit'
                }
            }
        ],
        '@typescript-eslint/no-inferrable-types': [
            'error',
            {
                ignoreProperties: true,
                ignoreParameters: true
            }
        ],
        'prefer-arrow/prefer-arrow-functions': [
            'warn',
            {
                disallowPrototype: true,
                singleReturnOnly: false,
                classPropertiesAllowed: false
            }
        ],
        indent: 'off',
        '@typescript-eslint/indent': ['error', 4]
    }
};
